Finding the nth highest salary in SQL Server can be done using various methods. One of the most common approaches is to use the `ROW_NUMBER()` function, which assigns a unique sequential integer to rows within a partition of a result set. Here's a detailed explanation and example:

### Using `ROW_NUMBER()` Function

The `ROW_NUMBER()` function assigns a unique number to each row starting from 1 based on the order specified in the `OVER` clause.

#### Steps:

1. Use a subquery to assign row numbers to each row based on the salary in descending order.
2. Filter the subquery to get the row corresponding to the nth highest salary.

**Example: Finding the 3rd Highest Salary**

```sql
WITH RankedSalaries AS (
    SELECT 
        Salary, 
        ROW_NUMBER() OVER (ORDER BY Salary DESC) AS RowNum
    FROM Employees
)
SELECT Salary
FROM RankedSalaries
WHERE RowNum = 3;
```
In this example:
- The `WITH` clause creates a common table expression (CTE) named `RankedSalaries` that includes salaries and row numbers.
- The `ROW_NUMBER()` function assigns a unique number to each row, ordered by salary in descending order.
- The outer query selects the salary from the `RankedSalaries` CTE where `RowNum` equals 3.

### Using `DENSE_RANK()` Function

The `DENSE_RANK()` function works similarly to `ROW_NUMBER()`, but it assigns the same rank to rows with equal values.

#### Example: Finding the 3rd Highest Salary

```sql
WITH RankedSalaries AS (
    SELECT 
        Salary, 
        DENSE_RANK() OVER (ORDER BY Salary DESC) AS Rank
    FROM Employees
)
SELECT Salary
FROM RankedSalaries
WHERE Rank = 3;
```

### Using `TOP` and Subquery

You can also use a subquery with the `TOP` clause to find the nth highest salary.

#### Example: Finding the 3rd Highest Salary

```sql
SELECT TOP 1 Salary
FROM (
    SELECT DISTINCT TOP 3 Salary
    FROM Employees
    ORDER BY Salary DESC
) AS TopSalaries
ORDER BY Salary ASC;
```
In this example:
- The inner query selects the top 3 distinct salaries ordered by salary in descending order.
- The outer query selects the top salary from the result of the inner query ordered by salary in ascending order.

### Summary

Finding the nth highest salary in SQL Server can be accomplished using functions like `ROW_NUMBER()`, `DENSE_RANK()`, or a combination of `TOP` and subqueries. Each approach has its advantages and can be chosen based on specific requirements.
