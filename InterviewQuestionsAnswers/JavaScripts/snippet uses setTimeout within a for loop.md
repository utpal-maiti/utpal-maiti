const arr = [10, 12, 15, 21]; for (var i = 0; i < arr.length; i++) { setTimeout(function() { console.log(`index: ${i}, element: ${arr[i]}`) }, 3000); } what would be the output
Let's break it down! This code snippet uses `setTimeout` within a `for` loop. Each loop iteration is intended to print the index and element from the `arr` array after 3000 milliseconds (3 seconds). 

However, the `setTimeout` function creates a closure that captures the value of `i` at the time the callback is executed, which will be after the loop has completed. So by the time the timeout executes, `i` will be equal to `arr.length`.

Here’s what happens:
- The loop runs from `i = 0` to `i = 3` (4 iterations).
- Each call to `setTimeout` schedules a function to execute after 3 seconds.

Since `var` has function scope (not block scope), `i` will be 4 for all callbacks when they execute:

So, the output will be:

```
index: 4, element: undefined
index: 4, element: undefined
index: 4, element: undefined
index: 4, element: undefined
```

To achieve the intended output, you can use `let` instead of `var` to create a block scope:

```javascript
const arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log(`index: ${i}, element: ${arr[i]}`);
    }, 3000);
}
```

Now the output will be as expected:

```
index: 0, element: 10
index: 1, element: 12
index: 2, element: 15
index: 3, element: 21
```
