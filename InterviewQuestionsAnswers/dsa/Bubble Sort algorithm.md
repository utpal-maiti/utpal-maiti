Here’s a **TypeScript-based summary and implementation** of the Bubble Sort algorithm as explained on the W3Schools page [1](https://www.w3schools.com/dsa/dsa_algo_bubblesort.php):

---

### 📚 Concept: Bubble Sort

- **Bubble Sort** is a simple sorting algorithm that repeatedly steps through the list.
- It compares adjacent elements and **swaps them** if they are in the wrong order.
- The largest values "bubble up" to the end of the array with each pass.

---

### 🔁 How It Works

1. Loop through the array multiple times.
2. In each pass, compare each pair of adjacent items.
3. Swap them if the first is greater than the second.
4. Repeat until no swaps are needed (array is sorted).

---

### 💻 TypeScript Implementation

```typescript
function bubbleSort(arr: number[]): number[] {
	const n = arr.length;
	let swapped: boolean;

	for (let i = 0; i < n - 1; i++) {
		swapped = false;

		for (let j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap elements
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				swapped = true;
			}
		}

		// If no swaps occurred, array is sorted
		if (!swapped) break;
	}

	return arr;
}

// Example usage:
const myArray = [64, 34, 25, 12, 22, 11, 90];
console.log('Sorted array:', bubbleSort(myArray));
```

---

### ⏱️ Time Complexity

- **Worst-case**: $$O(n^2)$$ — when the array is in reverse order.
- **Best-case**: $$O(n)$$ — when the array is already sorted (with optimization).
- **Average-case**: $$O(n^2)$$
