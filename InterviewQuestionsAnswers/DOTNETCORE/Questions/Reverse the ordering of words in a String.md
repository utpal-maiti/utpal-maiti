Sure thing! Here is a C# code snippet that will reverse the ordering of words in a string:

```csharp
using System;

class Program
{
    static void Main()
    {
        string s1 = "My name is X Y Z";
        string result = ReverseWords(s1);
        Console.WriteLine(result);
    }

    static string ReverseWords(string input)
    {
        // Split the input string by spaces
        string[] words = input.Split(' ');

        // Reverse the array of words
        Array.Reverse(words);

        // Join the reversed array of words back into a single string
        return string.Join(" ", words);
    }
}
```

When you run this code, it will output:

```
Z Y X is name My
```

Sure! Here is a C# code snippet to reverse the order of words in a string without using built-in functions:

```csharp
using System;

class Program
{
    static void Main()
    {
        string s1 = "My name is X Y Z";
        string result = ReverseWords(s1);
        Console.WriteLine(result);
    }

    static string ReverseWords(string input)
    {
        char[] delimiter = { ' ' };
        int start = 0;
        int end = input.Length - 1;
        // Count the number of words
        int wordCount = 1;
        for (int i = 0; i <= end; i++)
        {
            if (input[i] == delimiter[0])
            {
                wordCount++;
            }
        }

        // Create an array to hold the words
        string[] words = new string[wordCount];
        int wordIndex = 0;
        start = 0;
        // Extract words from input string
        for (int i = 0; i <= end; i++)
        {
            if (input[i] == delimiter[0] || i == end)
            {
                if (i == end)
                {
                    i++;
                }
                words[wordIndex++] = input.Substring(start, i - start);
                start = i + 1;
            }
        }

        // Reverse the words array
        for (int i = 0; i < wordCount / 2; i++)
        {
            string temp = words[i];
            words[i] = words[wordCount - i - 1];
            words[wordCount - i - 1] = temp;
        }

        // Join the words back into a single string
        string result = "";
        for (int i = 0; i < wordCount; i++)
        {
            result += words[i];
            if (i < wordCount - 1)
            {
                result += " ";
            }
        }

        return result;
    }
}
```

This code will output:

```
Z Y X is name My
```
