To calculate the average salary of employees in each department, you can use the `AVG()` aggregate function with a `GROUP BY` clause in SQL. Here's the query:

---

### Query

```sql
SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY DepartmentID;
```

---

### Explanation:

1. **`AVG(Salary)`**:
   - Calculates the average salary for each group of rows.
2. **`GROUP BY DepartmentID`**:
   - Groups the rows by the `DepartmentID` column, ensuring that the average salary is calculated separately for each department.
3. **`AS AverageSalary`**:
   - Provides an alias for the calculated average salary column in the result.

---

### Example Data

| EmployeeID | Name    | Salary | DepartmentID |
| ---------- | ------- | ------ | ------------ |
| 1          | Alice   | 50000  | 101          |
| 2          | Bob     | 60000  | 101          |
| 3          | Charlie | 70000  | 102          |
| 4          | David   | 80000  | 103          |
| 5          | Eve     | 90000  | 103          |

---

### Output

| DepartmentID | AverageSalary |
| ------------ | ------------- |
| 101          | 55000         |
| 102          | 70000         |
| 103          | 85000         |

---

### Handling Additional Scenarios

1. **Exclude Null Salaries**:
   Ensure that rows with `NULL` salaries are excluded from the calculation (this happens by default with `AVG()`).

   ```sql
   SELECT DepartmentID, AVG(Salary) AS AverageSalary
   FROM Employees
   WHERE Salary IS NOT NULL
   GROUP BY DepartmentID;
   ```

2. **Include Department Names**:
   If there's a separate `Departments` table with department names, join the tables to include department names in the result.

   ```sql
   SELECT d.DepartmentName, AVG(e.Salary) AS AverageSalary
   FROM Employees e
   JOIN Departments d ON e.DepartmentID = d.DepartmentID
   GROUP BY d.DepartmentName;
   ```

3. **Sort by Average Salary**:
   To display departments ordered by their average salary:
   ```sql
   SELECT DepartmentID, AVG(Salary) AS AverageSalary
   FROM Employees
   GROUP BY DepartmentID
   ORDER BY AverageSalary DESC;
   ```

---

This approach ensures accurate calculation of average salaries and supports various scenarios depending on your requirements.
