Here’s a **summary of the key points** from the W3Schools page on [Simple Algorithms in DSA](https://www.w3schools.com/dsa/dsa_algo_simple.php):

---

### 🔹 **Fibonacci Numbers as an Intro to Algorithms**

- The Fibonacci sequence is used to introduce algorithmic thinking.
- Sequence starts with **0 and 1**, and each subsequent number is the **sum of the two previous ones**.
- Example: `0, 1, 1, 2, 3, 5, 8, 13, 21, ...`

---

### 🔹 **Three Ways to Implement the Fibonacci Algorithm**

#### 1. **Using a For Loop**

- Start with two variables: `prev1 = 1`, `prev2 = 0`.
- Loop 18 times to generate the next numbers.
- Update the variables in each iteration.
- Efficient and straightforward.

#### 2. **Using Recursion (to print first 20 numbers)**

- A recursive function calls itself to generate the next number.
- Uses a global counter to limit the number of recursive calls.
- Demonstrates how recursion works but is less efficient than loops.

#### 3. **Using Recursion (to find the nth Fibonacci number)**

- Based on the formula:  
  $$F(n) = F(n-1) + F(n-2)$$
- Base case: if $$n \leq 1$$, return $$n$$.
- This method is **inefficient for large $$n$$** due to repeated calculations and exponential growth in function calls.

---

### 🔹 **Key Takeaways**

- **Algorithms** can be implemented in multiple ways.
- **Loops vs Recursion**:
  - Loops are generally more efficient.
  - Recursion is elegant but can be computationally expensive.
- Understanding both helps in choosing the right approach for different problems.

---

Here are **TypeScript examples** for generating Fibonacci numbers using three different approaches:

---

### ✅ **1. Using a For Loop**

```typescript
function fibonacciLoop(n: number): number[] {
	const sequence: number[] = [0, 1];
	for (let i = 2; i < n; i++) {
		sequence.push(sequence[i - 1] + sequence[i - 2]);
	}
	return sequence;
}

console.log(fibonacciLoop(20)); // First 20 Fibonacci numbers
```

---

### ✅ **2. Using Recursion (to print first 20 numbers)**

```typescript
function fibonacciRecursivePrint(n: number, a = 0, b = 1, count = 0): void {
	if (count >= n) return;
	console.log(a);
	fibonacciRecursivePrint(n, b, a + b, count + 1);
}

fibonacciRecursivePrint(20); // Prints first 20 Fibonacci numbers
```

---

### ✅ **3. Using Recursion (to find the nth Fibonacci number)**

```typescript
function fibonacciNth(n: number): number {
	if (n <= 1) return n;
	return fibonacciNth(n - 1) + fibonacciNth(n - 2);
}

console.log(fibonacciNth(10)); // 10th Fibonacci number
```

> ⚠️ Note: The third method is **not efficient** for large `n` due to repeated calculations. For better performance, consider using **memoization**.
