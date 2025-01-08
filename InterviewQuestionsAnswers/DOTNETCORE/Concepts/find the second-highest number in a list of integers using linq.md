Here's how you can find the second-highest number in a list of integers using LINQ in C#:

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class Program
{
    public static void Main()
    {
        List<int> numbers = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 };
        
        var secondHighest = numbers
                            .Distinct()  // Ensure we get distinct numbers
                            .OrderByDescending(n => n)  // Sort in descending order
                            .Skip(1)  // Skip the first (highest) number
                            .FirstOrDefault();  // Get the next number (second highest)
        
        Console.WriteLine("The second-highest number is: " + secondHighest);
    }
}
```

### Explanation
1. **Distinct()**: This method ensures that we only consider unique numbers, excluding duplicates.
2. **OrderByDescending(n => n)**: Sorts the list of numbers in descending order.
3. **Skip(1)**: Skips the first element in the sorted list, which is the highest number.
4. **FirstOrDefault()**: Retrieves the first element in the remaining list, which is the second-highest number.
