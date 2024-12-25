Certainly! Here's a simple C# program to find the second-highest number in a list of integers:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };

        int secondHighest = FindSecondHighest(numbers);

        if (secondHighest != int.MinValue)
        {
            Console.WriteLine($"The second-highest number is: {secondHighest}");
        }
        else
        {
            Console.WriteLine("The list does not have enough distinct numbers to determine the second-highest.");
        }
    }

    static int FindSecondHighest(List<int> numbers)
    {
        if (numbers == null || numbers.Count < 2)
        {
            return int.MinValue; // Indicating not enough numbers
        }

        int highest = int.MinValue;
        int secondHighest = int.MinValue;

        foreach (var number in numbers)
        {
            if (number > highest)
            {
                secondHighest = highest;
                highest = number;
            }
            else if (number > secondHighest && number != highest)
            {
                secondHighest = number;
            }
        }

        return secondHighest;
    }
}
```

### Explanation:

1. **Main Method**:

   - A list of integers is defined.
   - The `FindSecondHighest` method is called to find the second-highest number.
   - The result is printed.

2. **FindSecondHighest Method**:
   - It checks if the list has fewer than 2 elements and returns a special value (`int.MinValue`) if true.
   - It initializes two variables, `highest` and `secondHighest`, to the smallest possible integer value.
   - It iterates through the list to find the highest
