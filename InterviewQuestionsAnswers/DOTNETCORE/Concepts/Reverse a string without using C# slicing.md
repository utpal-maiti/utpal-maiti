Sure, you can reverse a string in C# without using slicing by iterating through the string and building the reversed string manually. Here's an example:

```csharp
using System;

class Program
{
    static void Main()
    {
        string original = "Hello, World!";
        string reversed = ReverseString(original);
        Console.WriteLine(reversed);
    }

    static string ReverseString(string input)
    {
        char[] charArray = input.ToCharArray();
        for (int i = 0, j = charArray.Length - 1; i < j; i++, j--)
        {
            char temp = charArray[i];
            charArray[i] = charArray[j];
            charArray[j] = temp;
        }
        return new string(charArray);
    }
}
```

In this example:

1. We convert the input string to a character array.
2. We use a `for` loop to swap characters from the start and end of the array until we reach the middle.
3. Finally, we create a new string from the reversed character array.
