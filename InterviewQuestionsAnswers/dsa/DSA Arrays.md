Here’s a **TypeScript-based summary** of the key concepts from the W3Schools page on **DSA Arrays**, including an example implementation:

---

### 📚 Concept: Arrays in DSA

- Arrays store multiple values of the same type.
- They are indexed, starting from `0`.
- Useful for storing and accessing data efficiently.

---

### 🧮 Example Task: Find the Lowest Value in an Array

#### ✅ Pseudocode Logic

1. Initialize `minVal` with the first element.
2. Loop through the array.
3. If an element is smaller than `minVal`, update `minVal`.

#### 💻 TypeScript Implementation

```typescript
function findLowestValue(arr: number[]): number {
	if (arr.length === 0) {
		throw new Error('Array is empty');
	}

	let minVal = arr[0];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < minVal) {
			minVal = arr[i];
		}
	}

	return minVal;
}

// Example usage:
const numbers = [7, 12, 9, 4, 11];
console.log('Lowest value:', findLowestValue(numbers)); // Output: 4
```

---

### ⏱️ Time Complexity

- **O(n)** — Linear time, as each element is checked once.
