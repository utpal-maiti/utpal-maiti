You got it! Here's how you can find common values from two different arrays using JavaScript. We'll utilize the `Set` object for efficient lookups.

```javascript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

// Convert the first array to a Set
const set1 = new Set(array1);

// Array to store common values
const commonValues = [];

// Check for common values in the second array
for (const value of array2) {
  if (set1.has(value)) {
    commonValues.push(value);
  }
}

console.log("Common values:", commonValues);
```

In this example:
- We convert `array1` to a `Set` which allows for O(1) average time complexity for lookups.
- Then, we iterate through `array2` and check if each element exists in the `Set`.
- If it does, we add it to the `commonValues` array.
- Finally, we log the common values to the console.
