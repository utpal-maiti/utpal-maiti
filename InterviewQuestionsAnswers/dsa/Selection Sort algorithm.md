Here’s a **TypeScript-based summary and implementation** of the **Selection Sort algorithm** as explained on the W3Schools page [1](https://www.w3schools.com/dsa/dsa_algo_selectionsort.php):

---

### 📚 Concept: Selection Sort

- **Selection Sort** repeatedly finds the **minimum element** from the unsorted part of the array and moves it to the beginning.
- It divides the array into a **sorted** and **unsorted** part.
- With each iteration, the smallest element from the unsorted part is selected and swapped with the first unsorted element.

---

### 🔁 How It Works

1. Start from the first element.
2. Find the **minimum** value in the unsorted part of the array.
3. Swap it with the first unsorted element.
4. Repeat for the remaining unsorted part.

---

### 💻 TypeScript Implementation

```typescript
function selectionSort(arr: number[]): number[] {
	const n = arr.length;

	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;

		// Find the index of the minimum element in the unsorted part
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}

		// Swap the found minimum element with the first unsorted element
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}

	return arr;
}

// Example usage:
const myArray = [64, 34, 25, 5, 22, 11, 90, 12];
console.log('Sorted array:', selectionSort(myArray));
```

---

### ⏱️ Time Complexity

- **Best-case**: $$O(n^2)$$ — even if the array is already sorted.
- **Worst-case**: $$O(n^2)$$ — when the array is in reverse order.
- **Average-case**: $$O(n^2)$$

Selection Sort is simple but not efficient for large datasets.
