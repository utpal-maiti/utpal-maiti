**FluentValidation** is a popular .NET library for building strongly-typed validation rules for your objects. It uses a fluent interface for defining validation rules in a clean and readable way. Let's explore the key concepts and usage of FluentValidation in C#.

### Key Concepts of FluentValidation

#### 1. Installing FluentValidation
First, you need to install the FluentValidation package using NuGet. You can do this via the Package Manager Console in Visual Studio:
```shell
Install-Package FluentValidation
```

#### 2. Creating a Validator
To create a validator, you need to define a class that inherits from `AbstractValidator<T>`, where `T` is the type of object you want to validate. Inside this class, you define the validation rules using the fluent interface.

##### Example:
```csharp
using FluentValidation;

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
}

public class PersonValidator : AbstractValidator<Person>
{
    public PersonValidator()
    {
        RuleFor(person => person.FirstName).NotEmpty().WithMessage("First name is required.");
        RuleFor(person => person.LastName).NotEmpty().WithMessage("Last name is required.");
        RuleFor(person => person.Age).InclusiveBetween(18, 100).WithMessage("Age must be between 18 and 100.");
    }
}
```

In this example:
- The `PersonValidator` class inherits from `AbstractValidator<Person>`.
- The `RuleFor` method is used to define validation rules for each property of the `Person` class.

#### 3. Validating an Object
Once you have defined a validator, you can use it to validate an instance of the object.

##### Example:
```csharp
public class Program
{
    public static void Main()
    {
        var person = new Person
        {
            FirstName = "John",
            LastName = "",
            Age = 17
        };

        var validator = new PersonValidator();
        var results = validator.Validate(person);

        if (!results.IsValid)
        {
            foreach (var error in results.Errors)
            {
                Console.WriteLine($"Property {error.PropertyName} failed validation. Error: {error.ErrorMessage}");
            }
        }
    }
}
```

In this example:
- The `Validate` method is called on the `PersonValidator` instance, passing the `person` object to validate.
- If the validation fails, the `Errors` collection contains details about the validation errors.

#### 4. Custom Validators
You can create custom validation rules by defining your own validators.

##### Example:
```csharp
public class CustomAgeValidator : AbstractValidator<int>
{
    public CustomAgeValidator()
    {
        RuleFor(age => age).Must(BeAValidAge).WithMessage("Age must be a valid number between 18 and 100.");
    }

    private bool BeAValidAge(int age)
    {
        return age >= 18 && age <= 100;
    }
}

public class PersonValidator : AbstractValidator<Person>
{
    public PersonValidator()
    {
        RuleFor(person => person.FirstName).NotEmpty().WithMessage("First name is required.");
        RuleFor(person => person.LastName).NotEmpty().WithMessage("Last name is required.");
        RuleFor(person => person.Age).SetValidator(new CustomAgeValidator());
    }
}
```

In this example:
- The `CustomAgeValidator` class defines a custom validation rule for the `Age` property.
- The `SetValidator` method is used to apply the custom validator in the `PersonValidator` class.

### Advanced Features

#### 5. Conditional Validation
You can apply validation rules conditionally based on other properties or custom logic.

##### Example:
```csharp
public class PersonValidator : AbstractValidator<Person>
{
    public PersonValidator()
    {
        RuleFor(person => person.FirstName).NotEmpty().WithMessage("First name is required.");
        RuleFor(person => person.LastName).NotEmpty().WithMessage("Last name is required.");
        RuleFor(person => person.Age)
            .InclusiveBetween(18, 100)
            .When(person => !string.IsNullOrEmpty(person.FirstName))
            .WithMessage("Age must be between 18 and 100 when first name is provided.");
    }
}
```

#### 6. Collection Validation
You can validate collections of objects by using the `SetCollectionValidator` method.

##### Example:
```csharp
public class Family
{
    public List<Person> Members { get; set; }
}

public class FamilyValidator : AbstractValidator<Family>
{
    public FamilyValidator()
    {
        RuleForEach(family => family.Members).SetValidator(new PersonValidator());
    }
}
```

In this example:
- The `FamilyValidator` class validates each member of the `Members` collection using the `PersonValidator`.

### Integrating with ASP.NET Core
FluentValidation can be integrated with ASP.NET Core to provide automatic validation for your models.

##### Example:
1. **Install the integration package**:
   ```shell
   Install-Package FluentValidation.AspNetCore
   ```

2. **Configure FluentValidation in Startup.cs**:
   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
       services.AddControllers()
               .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
   }
   ```

3. **Define Validators**:
   ```csharp
   public class PersonValidator : AbstractValidator<Person>
   {
       public PersonValidator()
       {
           RuleFor(person => person.FirstName).NotEmpty().WithMessage("First name is required.");
           RuleFor(person => person.LastName).NotEmpty().WithMessage("Last name is required.");
           RuleFor(person => person.Age).InclusiveBetween(18, 100).WithMessage("Age must be between 18 and 100.");
       }
   }
   ```

With this setup, FluentValidation will automatically validate your models during the model binding process in ASP.NET Core.

### Conclusion

FluentValidation provides a fluent, expressive, and flexible way to define validation rules for your objects in .NET. Its strong typing, extensibility, and integration with ASP.NET Core make it a powerful tool for ensuring your data is valid before processing.

