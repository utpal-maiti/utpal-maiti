function fibonacciLoop(n: number): number[] {
    const sequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

console.log(fibonacciLoop(20)); // First 20 Fibonacci numbers

function fibonacciRecursivePrint(n: number, a = 0, b = 1, count = 0): void {
    if (count >= n) return;
    console.log(a);
    fibonacciRecursivePrint(n, b, a + b, count + 1);
}

fibonacciRecursivePrint(20); // Prints first 20 Fibonacci numbers


function fibonacciNth(n: number): number {
    if (n <= 1) return n;
    return fibonacciNth(n - 1) + fibonacciNth(n - 2);
}

console.log(fibonacciNth(10)); // 10th Fibonacci number
