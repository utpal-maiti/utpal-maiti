Here's an example of a C# method that generates an email ID from first and last names:

```csharp
using System;

class Program
{
    static void Main()
    {
        string firstName = "John";
        string lastName = "Doe";
        string domain = "example.com";

        string email = GenerateEmail(firstName, lastName, domain);
        Console.WriteLine("Generated Email: " + email);
    }

    static string GenerateEmail(string firstName, string lastName, string domain)
    {
        // Remove any whitespace and convert to lowercase
        firstName = firstName.Trim().ToLower();
        lastName = lastName.Trim().ToLower();

        // Format the email
        return $"{firstName}.{lastName}@{domain}";
    }
}
```

### Explanation:

1. **Inputs**: First name, last name, and domain are provided as inputs.
2. **Processing**: The method trims extra spaces, converts names to lowercase, and combines them in `firstName.lastName` format.
3. **Output**: Returns a formatted email address like `john.doe@example.com`.

You can modify the domain or format (e.g., `firstName_lastName`) as needed.
