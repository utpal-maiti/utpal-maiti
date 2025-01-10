Certainly! Here's a straightforward way to find common values from two different arrays in C#. You can use `HashSet` for efficient lookup. Here's an example:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int[] array1 = { 1, 2, 3, 4, 5 };
        int[] array2 = { 3, 4, 5, 6, 7 };

        // Using HashSet to store elements of the first array
        HashSet<int> set = new HashSet<int>(array1);

        // List to store common values
        List<int> commonValues = new List<int>();

        // Check for common values in the second array
        foreach (int value in array2)
        {
            if (set.Contains(value))
            {
                commonValues.Add(value);
            }
        }

        // Output common values
        Console.WriteLine("Common values:");
        foreach (int value in commonValues)
        {
            Console.WriteLine(value);
        }
    }
}
```

In this example:
- We first create a `HashSet` to store the elements of the first array.
- Then, we iterate through the second array and check if each element exists in the `HashSet`.
- If it does, we add it to the `commonValues` list.
- Finally, we print the common values.
