Okay, handling deadlocks in MySQL (primarily within the InnoDB storage engine, which is the default and most commonly used engine supporting transactions and row-level locking) involves understanding how they occur, how MySQL resolves them, and how your application should react and ideally prevent them.

Here's a breakdown:

**1. How MySQL (InnoDB) Handles Deadlocks Internally**

* **Automatic Detection:** InnoDB has a built-in mechanism that constantly monitors for transaction lock dependencies. When it detects a circular dependency (Transaction A waits for B, and B waits for A), it identifies a deadlock.
* **Automatic Resolution (Rollback):** InnoDB doesn't let deadlocked transactions wait forever. It automatically chooses one of the transactions as a "victim" and rolls it back. This releases the locks held by the victim transaction, allowing the other transaction(s) involved in the deadlock to proceed.
* **Victim Selection:** The transaction chosen for rollback is typically the one that has done the least amount of "work" (e.g., modified the fewest rows or has the smallest undo log size). This minimizes the performance impact of the rollback.
* **Error Notification:** The client application whose transaction was rolled back receives an error: **Error Code: 1213, SQLSTATE: 40001 ("Deadlock found when trying to get lock; try restarting transaction")**.

**2. How Your Application Should Handle Deadlocks**

Since MySQL automatically resolves the deadlock by rolling back one transaction, the primary responsibility of your application is to handle the resulting error gracefully.

* **Detect the Deadlock Error:** Your application code (whether it's PHP, Python, Java, Go, Node.js, etc.) must specifically check for the MySQL error code `1213`.
* **Implement Retry Logic:** This is the most crucial step. When a deadlock error occurs, the operation failed because the transaction was rolled back. The application should:
    * Wait for a brief, often randomized, period (exponential backoff is a common strategy to avoid multiple clients retrying simultaneously).
    * Retry the *entire transaction* from the beginning.
    * Implement a maximum number of retries to prevent infinite loops if the underlying cause isn't fixed or if the deadlock condition persists frequently.
    * Log the deadlock occurrence (even if retried successfully) so you can investigate patterns later.

**Example (Conceptual Pseudocode):**

```
max_retries = 3
retry_count = 0
success = false

while retry_count < max_retries and not success:
    try:
        # Start Transaction
        db.begin_transaction()

        # --- Perform database operations ---
        # Example: Update account balances
        db.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1;")
        db.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2;")
        # --- End database operations ---

        # Commit Transaction
        db.commit()
        success = true

    except MySqlError as e:
        # Rollback any partial changes from the failed attempt
        db.rollback()

        if e.error_code == 1213: # Deadlock detected
            retry_count += 1
            log("Deadlock detected, attempt %d/%d. Retrying...", retry_count, max_retries)
            wait_random_time() # e.g., 50ms + random(0-100ms)
        else:
            # Handle other database errors
            log("Database error: %s", e)
            raise e # Re-throw if it's not a deadlock we want to retry

    finally:
        # Optional cleanup if needed, regardless of success/failure/retry
        pass


if not success:
    log("Transaction failed after %d retries due to persistent deadlock or other error.", max_retries)
    # Handle the final failure (e.g., return error to user)

```

**3. Preventing Deadlocks (Proactive Strategies)**

While handling deadlocks via retries is essential, preventing them in the first place is often better for performance and user experience. Here are common strategies:

* **Consistent Lock Order:** Ensure that different transactions needing to lock multiple resources (rows, tables) do so in the *same order*. For example, if you update `tableA` then `tableB`, *always* do it in that order, never `tableB` then `tableA` in another transaction. This is one of the most effective prevention methods.
* **Keep Transactions Short:** Design transactions to be as brief as possible. The less time a transaction holds locks, the lower the probability of conflicting with another transaction. Commit or roll back promptly. Break long processes into smaller, independent transactions if feasible.
* **Index Appropriately:**
    * Index columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses. This allows InnoDB to lock only the specific rows needed (row-level locking) rather than scanning larger ranges and potentially acquiring more locks (gap locks) or escalating to table locks.
    * Index foreign key columns. This speeds up foreign key checks and reduces the duration and scope of locks needed.
* **Use Appropriate Transaction Isolation Levels:** Understand the implications of different isolation levels (e.g., `READ COMMITTED`, `REPEATABLE READ`). `READ COMMITTED` generally holds row locks for a shorter duration than `REPEATABLE READ`, which can sometimes reduce the chance of deadlocks, but it allows non-repeatable reads. Choose the level that balances consistency needs and concurrency.
* **Minimize Lock Granularity:** Use row-level locking (InnoDB's default) whenever possible. Avoid explicit table locks (`LOCK TABLES`) unless absolutely necessary, as they severely limit concurrency.
* **Use `SELECT ... FOR UPDATE` or `SELECT ... LOCK IN SHARE MODE` Judiciously:** These statements acquire explicit locks. Understand *when* you need them and release them quickly by committing or rolling back the transaction. Don't hold these locks longer than necessary. Fetch the rows you need to lock, update them, and commit.
* **Analyze Deadlocks:** If deadlocks occur frequently, you need to diagnose the cause.

**4. Diagnosing Deadlocks**

* **`SHOW ENGINE INNODB STATUS;`:** This is the most valuable command. Run it immediately after a deadlock occurs (or check logs if enabled). Look for the `LATEST DETECTED DEADLOCK` section. It provides detailed information about:
    * The transactions involved.
    * The exact SQL statements being executed by each transaction.
    * The locks each transaction held.
    * The lock each transaction was waiting for.
    * Which transaction was chosen as the victim and rolled back.
    * This output is crucial for understanding *why* the deadlock happened and identifying which operations need adjustment (e.g., changing lock order, improving indexing, shortening transactions).
* **Enable Deadlock Logging:** You can configure MySQL to log deadlock information to the error log (`innodb_print_all_deadlocks` variable).
* **Performance Schema:** For more advanced monitoring, Performance Schema tables related to locking (`data_locks`, `data_lock_waits`) can provide insights, but `SHOW ENGINE INNODB STATUS` is often the most direct way to analyze a specific deadlock event.

**In Summary:**

Handling deadlocks in MySQL involves a combination of reactive (application-level retry logic for error 1213) and proactive (database design, indexing, query tuning, consistent lock ordering) strategies. When deadlocks happen, use `SHOW ENGINE INNODB STATUS` to diagnose the root cause and apply preventative measures.

Okay, let's look at code examples in several popular backend languages demonstrating how an application should handle MySQL deadlock errors (Error Code 1213) using retry logic.

**Core Principle:**

1.  **Wrap** the database transaction logic in a loop.
2.  **Use** a `try...catch` (or equivalent) block.
3.  **Inside** the `catch` block, specifically check if the error is a deadlock (MySQL error code `1213`).
4.  **If** it's a deadlock:
    * Rollback the failed transaction attempt.
    * Increment a retry counter.
    * Wait for a short, possibly randomized, time (backoff).
    * Continue the loop to retry the transaction.
5.  **If** it's another error, handle it appropriately (log, re-throw, etc.).
6.  **Limit** the number of retries to avoid infinite loops.
7.  **If** retries are exhausted, log the failure and report an error.
8.  **If** the transaction succeeds, exit the loop.

---

**1. Python (using `mysql.connector` or `PyMySQL`)**

```python
import mysql.connector
import time
import random

# --- Database Connection Details ---
db_config = {
    'user': 'your_user',
    'password': 'your_password',
    'host': '127.0.0.1',
    'database': 'your_db'
}
# ---

def execute_transaction_with_retry():
    max_retries = 3
    retry_delay_base_ms = 50 # Base delay in milliseconds
    conn = None # Initialize connection variable

    for attempt in range(max_retries):
        try:
            # Get connection (consider pooling in real apps)
            conn = mysql.connector.connect(**db_config)
            conn.autocommit = False # Ensure we control the transaction
            cursor = conn.cursor()

            print(f"Attempt {attempt + 1}/{max_retries}: Starting transaction...")

            # --- Your Transaction Operations ---
            cursor.execute("UPDATE products SET quantity = quantity - 1 WHERE id = 1 AND quantity > 0;")
            cursor.execute("UPDATE order_log SET status = 'processed' WHERE product_id = 1 AND order_id = 123;")
            # Add more operations as needed
            # --- End Transaction Operations ---

            conn.commit()
            print("Transaction successful.")
            return True # Success

        except mysql.connector.Error as err:
            print(f"Attempt {attempt + 1} failed: {err}")
            if conn:
                try:
                    conn.rollback() # Rollback on any error during transaction
                    print("Transaction rolled back.")
                except mysql.connector.Error as rb_err:
                    print(f"Rollback failed: {rb_err}") # Log this critical failure

            # Check specifically for deadlock error code
            if err.errno == 1213: # ER_LOCK_DEADLOCK
                if attempt < max_retries - 1:
                    # Apply backoff delay
                    delay = (retry_delay_base_ms + random.randint(0, 100)) / 1000.0 # Delay in seconds
                    print(f"Deadlock detected. Retrying after {delay:.3f} seconds...")
                    time.sleep(delay)
                    # Continue to the next iteration of the loop
                else:
                    print("Deadlock detected, but max retries reached. Giving up.")
                    return False # Failed after retries
            else:
                # It's a different MySQL error, handle or re-raise
                print("Non-deadlock database error occurred.")
                # Depending on the error, you might want to raise it or return False
                # raise err # Option to re-raise
                return False # Or just indicate failure

        finally:
            # Ensure connection is closed
            if conn and conn.is_connected():
                cursor.close()
                conn.close()
                print("Connection closed.")

    return False # Should only be reached if max retries hit by deadlock

# --- Example Usage ---
if execute_transaction_with_retry():
    print("Operation completed successfully.")
else:
    print("Operation failed after retries or due to an error.")
```

---

**2. PHP (using PDO)**

```php
<?php

// --- Database Connection Details ---
$dsn = 'mysql:host=127.0.0.1;dbname=your_db;charset=utf8mb4';
$username = 'your_user';
$password = 'your_password';
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Important for catching errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
// ---

function executeTransactionWithRetry(string $dsn, string $username, string $password, array $options): bool
{
    $maxRetries = 3;
    $retryDelayBaseMs = 50; // Base delay in milliseconds
    $pdo = null; // Initialize PDO variable

    for ($attempt = 0; $attempt < $maxRetries; $attempt++) {
        try {
            // Get connection (consider persistent connections or pooling patterns)
            $pdo = new PDO($dsn, $username, $password, $options);

            $pdo->beginTransaction();
            echo "Attempt " . ($attempt + 1) . "/$maxRetries: Starting transaction...\n";

            // --- Your Transaction Operations ---
            $stmt1 = $pdo->prepare("UPDATE products SET quantity = quantity - 1 WHERE id = 1 AND quantity > 0;");
            $stmt1->execute();

            $stmt2 = $pdo->prepare("UPDATE order_log SET status = 'processed' WHERE product_id = 1 AND order_id = 123;");
            $stmt2->execute();
            // Add more operations as needed
            // --- End Transaction Operations ---

            $pdo->commit();
            echo "Transaction successful.\n";
            $pdo = null; // Close connection implicitly on success
            return true; // Success

        } catch (PDOException $e) {
            echo "Attempt " . ($attempt + 1) . " failed: " . $e->getMessage() . "\n";

            // Rollback if connection is still active and in transaction
            if ($pdo && $pdo->inTransaction()) {
                try {
                    $pdo->rollBack();
                    echo "Transaction rolled back.\n";
                } catch (PDOException $rbEx) {
                     echo "Rollback failed: " . $rbEx->getMessage() . "\n"; // Log this
                }
            }

            // Check specifically for deadlock error code (SQLSTATE 40001 or error code 1213)
            // Note: $e->getCode() might be a string or int depending on driver/PHP version
            // $e->errorInfo[1] usually contains the driver-specific error code
            if (isset($e->errorInfo[1]) && $e->errorInfo[1] == 1213) { // Check driver-specific code
                if ($attempt < $maxRetries - 1) {
                    // Apply backoff delay
                    $delayMicroseconds = ($retryDelayBaseMs + random_int(0, 100)) * 1000;
                    echo "Deadlock detected. Retrying after " . ($delayMicroseconds / 1000000.0) . " seconds...\n";
                    usleep($delayMicroseconds);
                    // Continue to the next iteration
                } else {
                    echo "Deadlock detected, but max retries reached. Giving up.\n";
                    $pdo = null; // Close connection
                    return false; // Failed after retries
                }
            } else {
                // It's a different database error
                echo "Non-deadlock database error occurred.\n";
                $pdo = null; // Close connection
                // throw $e; // Option to re-throw
                return false; // Indicate failure
            }
        } finally {
             // Ensure connection resource is released if loop terminates unexpectedly
             // (though try/catch should handle most cases)
             $pdo = null;
        }
    }
     return false; // Should only be reached if max retries hit by deadlock
}

// --- Example Usage ---
if (executeTransactionWithRetry($dsn, $username, $password, $options)) {
    echo "Operation completed successfully.\n";
} else {
    echo "Operation failed after retries or due to an error.\n";
}

?>
```

---

**3. Java (using JDBC)**

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class DeadlockHandler {

    // --- Database Connection Details ---
    private static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/your_db?useSSL=false";
    private static final String DB_USER = "your_user";
    private static final String DB_PASSWORD = "your_password";
    // ---

    public static boolean executeTransactionWithRetry() {
        int maxRetries = 3;
        long retryDelayBaseMs = 50; // Base delay in milliseconds
        Random random = new Random();
        Connection conn = null; // Initialize connection variable

        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try {
                // Get connection (use a Connection Pool in real applications!)
                conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
                conn.setAutoCommit(false); // Start transaction control

                System.out.printf("Attempt %d/%d: Starting transaction...\n", attempt + 1, maxRetries);

                // --- Your Transaction Operations ---
                try (PreparedStatement stmt1 = conn.prepareStatement(
                        "UPDATE products SET quantity = quantity - 1 WHERE id = 1 AND quantity > 0;")) {
                    stmt1.executeUpdate();
                }
                try (PreparedStatement stmt2 = conn.prepareStatement(
                        "UPDATE order_log SET status = 'processed' WHERE product_id = 1 AND order_id = 123;")) {
                    stmt2.executeUpdate();
                }
                // Add more operations as needed
                // --- End Transaction Operations ---

                conn.commit();
                System.out.println("Transaction successful.");
                return true; // Success

            } catch (SQLException e) {
                System.out.printf("Attempt %d failed: %s (SQLState: %s, ErrorCode: %d)\n",
                        attempt + 1, e.getMessage(), e.getSQLState(), e.getErrorCode());

                if (conn != null) {
                    try {
                        conn.rollback();
                        System.out.println("Transaction rolled back.");
                    } catch (SQLException rbEx) {
                        System.err.println("Rollback failed: " + rbEx.getMessage()); // Log this critical failure
                    }
                }

                // Check specifically for deadlock error code
                if (e.getErrorCode() == 1213) { // ER_LOCK_DEADLOCK
                    if (attempt < maxRetries - 1) {
                        // Apply backoff delay
                        long delay = retryDelayBaseMs + random.nextInt(101); // Delay in milliseconds
                        System.out.printf("Deadlock detected. Retrying after %d ms...\n", delay);
                        try {
                            TimeUnit.MILLISECONDS.sleep(delay);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt(); // Restore interrupt status
                            System.err.println("Retry delay interrupted.");
                            return false; // Stop retrying if interrupted
                        }
                        // Continue to the next iteration
                    } else {
                        System.out.println("Deadlock detected, but max retries reached. Giving up.");
                        return false; // Failed after retries
                    }
                } else {
                    // It's a different database error
                    System.out.println("Non-deadlock database error occurred.");
                    // Depending on the error, you might want to wrap and re-throw or return false
                    // throw new RuntimeException("Database operation failed", e); // Option to re-throw
                    return false; // Indicate failure
                }

            } finally {
                // Ensure connection is closed
                if (conn != null) {
                    try {
                        conn.close();
                        System.out.println("Connection closed.");
                    } catch (SQLException closeEx) {
                        System.err.println("Failed to close connection: " + closeEx.getMessage());
                    }
                }
            }
        }
         return false; // Should only be reached if max retries hit by deadlock
    }

    // --- Example Usage ---
    public static void main(String[] args) {
        if (executeTransactionWithRetry()) {
            System.out.println("Operation completed successfully.");
        } else {
            System.out.println("Operation failed after retries or due to an error.");
        }
    }
}
```

---

**4. Node.js (using `mysql2/promise`)**

```javascript
const mysql = require('mysql2/promise');
const util = require('util');

// --- Database Connection Details ---
const dbConfig = {
    host: '127.0.0.1',
    user: 'your_user',
    password: 'your_password',
    database: 'your_db',
    // connectionLimit: 10 // Example for pool configuration
};
// ---

// Helper function for delay
const sleep = util.promisify(setTimeout);

async function executeTransactionWithRetry() {
    const maxRetries = 3;
    const retryDelayBaseMs = 50;
    let connection = null; // Initialize connection variable

    // Use a connection pool in real applications
    const pool = mysql.createPool(dbConfig);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            connection = await pool.getConnection(); // Get connection from pool
            await connection.beginTransaction();
            console.log(`Attempt ${attempt + 1}/${maxRetries}: Starting transaction...`);

            // --- Your Transaction Operations ---
            await connection.execute(
                "UPDATE products SET quantity = quantity - 1 WHERE id = ? AND quantity > 0;",
                [1]
            );
            await connection.execute(
                "UPDATE order_log SET status = 'processed' WHERE product_id = ? AND order_id = ?;",
                [1, 123]
            );
            // Add more operations as needed
            // --- End Transaction Operations ---

            await connection.commit();
            console.log("Transaction successful.");
            return true; // Success

        } catch (err) {
            console.error(`Attempt ${attempt + 1} failed: ${err.message} (Code: ${err.code}, Errno: ${err.errno})`);

            if (connection) {
                try {
                    await connection.rollback();
                    console.log("Transaction rolled back.");
                } catch (rbErr) {
                    console.error(`Rollback failed: ${rbErr.message}`); // Log this
                }
            }

            // Check specifically for deadlock error code
            if (err.errno === 1213 && err.code === 'ER_LOCK_DEADLOCK') {
                if (attempt < maxRetries - 1) {
                    // Apply backoff delay
                    const delay = retryDelayBaseMs + Math.floor(Math.random() * 101);
                    console.log(`Deadlock detected. Retrying after ${delay} ms...`);
                    await sleep(delay);
                    // Continue to the next iteration
                } else {
                    console.log("Deadlock detected, but max retries reached. Giving up.");
                    return false; // Failed after retries
                }
            } else {
                // It's a different database error
                console.log("Non-deadlock database error occurred.");
                // throw err; // Option to re-throw
                return false; // Indicate failure
            }

        } finally {
            // Ensure connection is released back to the pool
            if (connection) {
                connection.release();
                console.log("Connection released.");
            }
        }
    }

    await pool.end(); // Close the pool when done with all operations (usually at app shutdown)
    return false; // Should only be reached if max retries hit by deadlock
}

// --- Example Usage ---
(async () => {
    const success = await executeTransactionWithRetry();
    if (success) {
        console.log("Operation completed successfully.");
    } else {
        console.log("Operation failed after retries or due to an error.");
    }
    // Ensure pool is closed if not done elsewhere
    // await pool.end(); // Or manage pool lifecycle appropriately
})();
```

---

**5. Go (using `database/sql` and `go-sql-driver/mysql`)**

```go
package main

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/go-sql-driver/mysql" // Import the MySQL driver
)

// --- Database Connection Details ---
const (
	dbUser = "your_user"
	dbPass = "your_password"
	dbHost = "127.0.0.1"
	dbPort = "3306"
	dbName = "your_db"
)

// ---

// Global DB pool (recommended)
var db *sql.DB

func init() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbPort, dbName)

	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Failed to open database connection: %v", err)
	}

	// Configure connection pool (important for performance)
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Ping to verify connection early
	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Database connection pool initialized.")
}

func executeTransactionWithRetry() error {
	maxRetries := 3
	retryDelayBaseMs := 50 // Base delay in milliseconds

	for attempt := 0; attempt < maxRetries; attempt++ {
		// Start transaction
		tx, err := db.Begin()
		if err != nil {
			log.Printf("Attempt %d/%d: Failed to begin transaction: %v\n", attempt+1, maxRetries, err)
			// Check if error is temporary/retryable? Maybe not for Begin()
			return fmt.Errorf("failed to begin transaction: %w", err) // Don't retry Begin failure usually
		}

		log.Printf("Attempt %d/%d: Starting transaction...\n", attempt+1, maxRetries)

		// --- Your Transaction Operations ---
		_, err = tx.Exec("UPDATE products SET quantity = quantity - 1 WHERE id = ? AND quantity > 0;", 1)
		if err != nil {
			// Rollback and check for deadlock
			log.Printf("Attempt %d failed during first exec: %v\n", attempt+1, err)
			return handleTransactionError(tx, err, attempt, maxRetries, retryDelayBaseMs) // Pass attempt info
		}

		_, err = tx.Exec("UPDATE order_log SET status = 'processed' WHERE product_id = ? AND order_id = ?;", 1, 123)
		if err != nil {
			// Rollback and check for deadlock
			log.Printf("Attempt %d failed during second exec: %v\n", attempt+1, err)
			return handleTransactionError(tx, err, attempt, maxRetries, retryDelayBaseMs) // Pass attempt info
		}
		// Add more operations as needed
		// --- End Transaction Operations ---

		// If all operations succeeded, try to commit
		err = tx.Commit()
		if err != nil {
			// Commit failed, attempt rollback and check for deadlock (less common but possible)
			log.Printf("Attempt %d failed during commit: %v\n", attempt+1, err)
			return handleTransactionError(tx, err, attempt, maxRetries, retryDelayBaseMs) // Pass attempt info
		}

		// Commit was successful
		log.Println("Transaction successful.")
		return nil // Success

	} // End of retry loop

	// If loop finishes, it means max retries were hit
	log.Println("Transaction failed after maximum retries due to deadlocks.")
	return fmt.Errorf("transaction failed after %d retries", maxRetries)
}

// Helper function to handle errors within the transaction loop
func handleTransactionError(tx *sql.Tx, originalErr error, attempt int, maxRetries int, retryDelayBaseMs int) error {
	// Always attempt rollback on error
	rollbackErr := tx.Rollback()
	if rollbackErr != nil {
		log.Printf("CRITICAL: Failed to rollback transaction after error: %v (Original error: %v)\n", rollbackErr, originalErr)
		// Return the rollback error as it's more critical, or combine them
		return fmt.Errorf("rollback failed (%v) after original error (%w)", rollbackErr, originalErr)
	}
	log.Println("Transaction rolled back.")

	// Check if the original error is a MySQL deadlock
	var mysqlErr *mysql.MySQLError
	isDeadlock := false
	if errors.As(originalErr, &mysqlErr) && mysqlErr.Number == 1213 { // ER_LOCK_DEADLOCK
		isDeadlock = true
	}

	if isDeadlock {
		if attempt < maxRetries-1 {
			// Apply backoff delay
			delay := time.Duration(retryDelayBaseMs+rand.Intn(101)) * time.Millisecond
			log.Printf("Deadlock detected. Retrying after %v...\n", delay)
			time.Sleep(delay)
			// Indicate that the caller should retry (by returning a special error or nil if loop handles it)
			// In this structure, returning nil tells the loop to continue
			return nil // Signal loop to retry (will return error outside loop if max retries reached)
		} else {
			log.Println("Deadlock detected, but max retries reached. Giving up.")
			// Return the original deadlock error after max retries
			return originalErr
		}
	} else {
		// It's a different database error, return it immediately
		log.Printf("Non-deadlock database error occurred: %v\n", originalErr)
		return originalErr
	}
}

// --- Example Usage ---
func main() {
    // Ensure db connection pool is closed eventually
    defer db.Close()

	err := executeTransactionWithRetry()
	if err != nil {
		// Check the *final* error returned by the function
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1213 {
			log.Printf("Operation ultimately failed due to a persistent deadlock after retries: %v", err)
		} else if err.Error() == fmt.Sprintf("transaction failed after %d retries", 3) {
             log.Printf("Operation failed due to hitting max retries for deadlocks.")
        } else {
			log.Printf("Operation failed due to a non-deadlock error: %v", err)
		}
	} else {
		log.Println("Operation completed successfully.")
	}
}

// Need this import for errors.As used in Go 1.13+ handleTransactionError
import "errors"
```

---

**Key Considerations for All Examples:**

* **Connection Pooling:** In production applications, always use a connection pool instead of creating new connections for each transaction. The examples show getting a connection/releasing it, which corresponds to acquiring/releasing from a pool.
* **Error Checking Granularity:** Some examples check the error code after the `catch` block, others might check within specific operations if the library allows. The key is identifying the `1213` error code.
* **Backoff Strategy:** A simple random delay is shown. More robust strategies include exponential backoff (increasing delay with each retry).
* **Logging:** Use a proper logging framework in production instead of `print`/`console.log`/`log.Println`.
* **Idempotency:** Ensure the operations within your transaction can be safely retried. If performing actions with side effects outside the DB, retrying might require more complex handling.
* **Library/ORM Specifics:** If you're using an ORM (like SQLAlchemy, TypeORM, GORM, Doctrine), it might have its own transaction management features or helpers for handling retries, but the underlying principle of catching the deadlock error and retrying remains the same. Consult your ORM's documentation.

Okay, let's clarify how "handling" deadlocks works in the context of purely `.sql` code executed within MySQL.

It's crucial to understand that **MySQL's InnoDB engine automatically detects and resolves deadlocks**. It does this by choosing one transaction as a victim, rolling it back, and letting the other(s) proceed. Your SQL code doesn't *resolve* the deadlock itself; InnoDB does.

When we talk about "handling deadlocks" in SQL code, it primarily means two things:

1.  **Implementing Retry Logic (within Stored Procedures/Functions):** Reacting to the deadlock error (1213) when it occurs for the rolled-back transaction and retrying the transaction. This is feasible within stored procedures or functions using MySQL's procedural SQL capabilities. Simple `.sql` scripts run via the command line client generally *cannot* implement this kind of complex retry logic with delays.
2.  **Preventing Deadlocks:** Writing SQL (DDL and DML) in a way that minimizes the chances of deadlocks occurring in the first place (using indexes, consistent lock order, short transactions).
3.  **Diagnosing Deadlocks:** Using SQL commands to investigate *why* deadlocks are happening.

Let's look at each:

**1. Implementing Retry Logic in a Stored Procedure (.sql code)**

You can create a stored procedure that encapsulates a transaction and includes logic to catch the deadlock error and retry.

```sql
-- Ensure delimiter is changed if running this in a client that uses ;
-- DELIMITER // -- Uncomment if needed in your client

DROP PROCEDURE IF EXISTS safe_transfer_funds;

CREATE PROCEDURE safe_transfer_funds (
    IN p_from_account INT,
    IN p_to_account INT,
    IN p_amount DECIMAL(10, 2)
)
proc_label:BEGIN
    DECLARE v_max_retries INT DEFAULT 3;
    DECLARE v_retry_count INT DEFAULT 0;
    DECLARE v_retry_delay_seconds DECIMAL(3,2) DEFAULT 0.05; -- Base delay
    DECLARE deadlock_detected BOOLEAN DEFAULT FALSE;

    -- Handler for the deadlock error (SQLSTATE '40001' or MySQL error code 1213)
    DECLARE CONTINUE HANDLER FOR SQLSTATE '40001'
    BEGIN
        SET deadlock_detected = TRUE;
        -- Note: A CONTINUE handler implicitly returns control after its BEGIN/END block
        -- or immediately after the SET statement here. The loop condition handles retry.
    END;

    -- Optional: General handler to see other errors
    /*
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Log or signal a general failure
        ROLLBACK; -- Ensure rollback on unexpected errors
        SIGNAL SQLSTATE '41000' SET MESSAGE_TEXT = 'Unhandled SQL Exception during transfer';
    END;
    */

    retry_loop: LOOP
        IF v_retry_count >= v_max_retries THEN
            -- Max retries exceeded, signal failure
            SIGNAL SQLSTATE '40001' -- Re-signal deadlock state or a custom state
                SET MESSAGE_TEXT = 'Transaction failed due to deadlock after maximum retries.';
            LEAVE retry_loop; -- Exit loop
        END IF;

        SET deadlock_detected = FALSE; -- Reset flag for this attempt

        -- Start the actual transaction for this attempt
        START TRANSACTION;

        -- --- Transaction Operations ---
        -- Operation 1: Debit from account (lock row)
        UPDATE accounts SET balance = balance - p_amount
        WHERE account_id = p_from_account AND balance >= p_amount;

        -- Check if the debit was successful (enough balance?)
        IF ROW_COUNT() = 0 THEN
             ROLLBACK;
             SIGNAL SQLSTATE '45000' -- Custom error state
                 SET MESSAGE_TEXT = 'Insufficient funds or source account not found.';
             LEAVE retry_loop;
        END IF;

        -- Operation 2: Credit to account (lock row)
        UPDATE accounts SET balance = balance + p_amount
        WHERE account_id = p_to_account;

         IF ROW_COUNT() = 0 THEN
             ROLLBACK;
             SIGNAL SQLSTATE '45000' -- Custom error state
                 SET MESSAGE_TEXT = 'Destination account not found.';
             LEAVE retry_loop;
        END IF;
        -- --- End Transaction Operations ---

        -- If deadlock occurred during operations, the handler set deadlock_detected = TRUE
        IF deadlock_detected THEN
            -- Deadlock was caught by the handler
            ROLLBACK; -- Rollback the failed attempt explicitly
            SET v_retry_count = v_retry_count + 1;
            -- Wait before retrying (add slight randomness)
            SELECT SLEEP(v_retry_delay_seconds + (RAND() * 0.1));
            -- Loop continues for the next retry
        ELSE
            -- No deadlock detected for this attempt, commit
            COMMIT;
            LEAVE retry_loop; -- Success, exit loop
        END IF;

    END LOOP retry_loop;

END; -- // -- Uncomment delimiter if needed

-- DELIMITER ; -- Uncomment if needed in your client

-- How to call the procedure:
-- CALL safe_transfer_funds(123, 456, 100.00);
```

**Explanation:**

* **`DECLARE HANDLER FOR SQLSTATE '40001'`**: This specifically catches the deadlock error. When caught, it sets a flag (`deadlock_detected`). The `CONTINUE` type allows execution to proceed *after* the statement that caused the error (or after the handler's block).
* **`retry_loop`**: Controls the retries.
* **`v_retry_count`, `v_max_retries`**: Limit the number of attempts.
* **`START TRANSACTION`/`COMMIT`/`ROLLBACK`**: Standard transaction control within the loop attempt.
* **`IF deadlock_detected THEN ...`**: After the transaction's SQL, this checks if the handler was invoked. If yes, it rolls back, increments the counter, waits (`SELECT SLEEP(...)`), and the loop continues.
* **`SIGNAL SQLSTATE ...`**: Used to report final failure (max retries reached) or other business rule violations (like insufficient funds).

**2. Preventing Deadlocks using SQL**

This involves how you structure your database and write your queries:

* **Indexing:** Ensure columns used in `WHERE` clauses, `JOIN` conditions, and `ORDER BY` clauses within transactions are properly indexed. This helps InnoDB lock only the necessary rows.
    ```sql
    -- Example: Add index to improve locking during updates/selects
    CREATE INDEX idx_account_balance ON accounts (account_id, balance);
    CREATE INDEX idx_order_log_product_order ON order_log (product_id, order_id);
    ```
* **Consistent Lock Order:** While not strictly SQL *code*, it's a crucial *pattern* when writing SQL within applications or procedures. Always access (and thus lock) resources (tables, rows) in the same sequence across different transactions.
* **Short Transactions:** Keep the work done between `START TRANSACTION` and `COMMIT`/`ROLLBACK` as minimal and fast as possible.
* **Isolation Level:** You can set the transaction isolation level. `READ COMMITTED` sometimes reduces deadlocks compared to `REPEATABLE READ` because it holds locks for shorter durations, but be aware of its implications (non-repeatable reads).
    ```sql
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    START TRANSACTION;
    -- Your SQL operations...
    COMMIT;
    -- Remember to set it back or configure globally if needed.
    ```

**3. Diagnosing Deadlocks using SQL**

If deadlocks are occurring, you use SQL to find out why:

* **`SHOW ENGINE INNODB STATUS;`**: This is the **most important command**. Execute it immediately after a deadlock occurs. Look for the `LATEST DETECTED DEADLOCK` section. It provides invaluable details about the transactions involved, the locks held, the locks waited for, and the SQL statements being executed.
    ```sql
    SHOW ENGINE INNODB STATUS; -- Run this in your MySQL client
    ```
* **Information Schema / Performance Schema:** Query system tables for locking information (often more complex to interpret than `SHOW ENGINE INNODB STATUS` for a single deadlock event, but useful for monitoring).
    ```sql
    -- See current transactions
    SELECT * FROM information_schema.innodb_trx;

    -- See current locks
    SELECT * FROM information_schema.innodb_locks;

    -- See lock waits (what is waiting for what)
    SELECT * FROM information_schema.innodb_lock_waits;

    -- Performance Schema (more detailed, requires setup/enabling)
    SELECT * FROM performance_schema.data_lock_waits;
    ```

In summary, while `.sql` code itself doesn't *resolve* deadlocks, you can use stored procedures (`.sql` code) to implement retry logic, and you use various SQL commands (DDL, DML patterns, `SHOW STATUS`, querying schema tables) to prevent and diagnose them. For simple scripts, handling deadlocks usually falls back to the calling application or script runner.