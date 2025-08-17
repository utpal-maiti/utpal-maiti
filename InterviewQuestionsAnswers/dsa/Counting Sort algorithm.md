Here’s a **TypeScript-based summary and implementation** of the **Counting Sort algorithm** as explained on W3Schools [1](https://www.w3schools.com/dsa/dsa_algo_countingsort.php) [2](https://www.w3schools.com/dsa/dsa_timecomplexity_countsort.php):

---

### 📚 Concept: Counting Sort

- **Counting Sort** is a non-comparative sorting algorithm.
- It works by **counting the occurrences** of each value in the input array.
- Best suited for **non-negative integers** within a **limited range**.
- It is **fast** when the range of values (`k`) is **not much larger** than the number of elements (`n`).

---

### 🔁 How It Works

1. Find the **maximum value** in the array to determine the size of the counting array.
2. Create a **counting array** of size `max + 1` and initialize all elements to `0`.
3. Count the occurrences of each value.
4. Use the counting array to **reconstruct** the sorted array.

---

### 💻 TypeScript Implementation

```typescript
function countingSort(arr: number[]): number[] {
	if (arr.length === 0) return [];

	const max = Math.max(...arr);
	const count = new Array(max + 1).fill(0);

	// Count occurrences
	for (const num of arr) {
		count[num]++;
	}

	// Build the sorted array
	const sorted: number[] = [];
	for (let i = 0; i < count.length; i++) {
		while (count[i] > 0) {
			sorted.push(i);
			count[i]--;
		}
	}

	return sorted;
}

// Example usage:
const myArray = [2, 3, 0, 2, 3, 2];
console.log('Sorted array:', countingSort(myArray)); // Output: [0, 2, 2, 2, 3, 3]
```

---

### ⏱️ Time Complexity

- **Best-case**: $$O(n)$$ — when the range `k` is small relative to `n`.
- **Worst-case**: $$O(n + k)$$ — when `k` is large compared to `n` [2](https://www.w3schools.com/dsa/dsa_timecomplexity_countsort.php).

---

### ⚠️ Limitations

- Only works for **non-negative integers**.
- Not suitable when the range of values (`k`) is **much larger** than the number of elements (`n`).
00