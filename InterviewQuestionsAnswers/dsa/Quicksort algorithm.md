Here’s a **TypeScript-based summary and implementation** of the **Quicksort algorithm** as explained on the W3Schools page [1](https://www.w3schools.com/dsa/dsa_algo_quicksort.php):

---

### 📚 Concept: Quicksort

- **Quicksort** is a highly efficient sorting algorithm.
- It uses a **divide-and-conquer** strategy.
- The algorithm selects a **pivot** element and partitions the array so that:
  - Elements **less than** the pivot go to the **left**.
  - Elements **greater than** the pivot go to the **right**.
- It then **recursively** applies the same logic to the left and right sub-arrays.

---

### 🔁 How It Works

1. Choose a pivot (commonly the last element).
2. Partition the array around the pivot.
3. Recursively apply Quicksort to the left and right partitions.

---

### 💻 TypeScript Implementation

```typescript
function quickSort(
	arr: number[],
	low: number = 0,
	high: number = arr.length - 1
): number[] {
	if (low < high) {
		const pivotIndex = partition(arr, low, high);
		quickSort(arr, low, pivotIndex - 1);
		quickSort(arr, pivotIndex + 1, high);
	}
	return arr;
}

function partition(arr: number[], low: number, high: number): number {
	const pivot = arr[high];
	let i = low - 1;

	for (let j = low; j < high; j++) {
		if (arr[j] < pivot) {
			i++;
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}

	[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
	return i + 1;
}

// Example usage:
const myArray = [11, 9, 12, 7, 3];
console.log('Sorted array:', quickSort(myArray)); // Output: [3, 7, 9, 11, 12]
```

---

### ⏱️ Time Complexity

- **Best/Average-case**: $$O(n \log n)$$ — when the pivot divides the array evenly.
- **Worst-case**: $$O(n^2)$$ — when the pivot is the smallest or largest element repeatedly.
