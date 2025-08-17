Here’s a **TypeScript-based summary and implementation** of the **Insertion Sort algorithm** as explained on the W3Schools page [1](https://www.w3schools.com/dsa/dsa_algo_insertionsort.php):

---

### 📚 Concept: Insertion Sort

- **Insertion Sort** builds the final sorted array one item at a time.
- It works similarly to how you might sort playing cards in your hands.
- The array is divided into a **sorted** and **unsorted** part.
- Each element from the unsorted part is picked and placed in the correct position in the sorted part.

---

### 🔁 How It Works

1. Start with the second element (first is considered sorted).
2. Compare it with elements in the sorted part.
3. Shift larger elements to the right.
4. Insert the current element into its correct position.
5. Repeat for all elements.

---

### 💻 TypeScript Implementation

```typescript
function insertionSort(arr: number[]): number[] {
	for (let i = 1; i < arr.length; i++) {
		let key = arr[i];
		let j = i - 1;

		// Move elements of arr[0..i-1], that are greater than key,
		// to one position ahead of their current position
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
		}

		arr[j + 1] = key;
	}

	return arr;
}

// Example usage:
const myArray = [7, 12, 9, 11, 3];
console.log('Sorted array:', insertionSort(myArray)); // Output: [3, 7, 9, 11, 12]
```

---

### ⏱️ Time Complexity

- **Best-case**: $$O(n)$$ — when the array is already sorted.
- **Worst-case**: $$O(n^2)$$ — when the array is sorted in reverse.
- **Average-case**: $$O(n^2)$$
