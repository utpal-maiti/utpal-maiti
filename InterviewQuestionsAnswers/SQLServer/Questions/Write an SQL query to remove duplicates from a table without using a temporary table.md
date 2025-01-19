Here's an example of how to remove duplicates from a table without using a temporary table. Let's assume you have a table called `Employees` with columns `id`, `name`, and `department`, and you want to remove rows where the `name` and `department` columns are duplicated.

You can use the following query:

```sql
DELETE FROM Employees
WHERE id NOT IN (
    SELECT MIN(id)
    FROM Employees
    GROUP BY name, department
);
```

This query works by identifying the minimum `id` for each unique combination of `name` and `department`, and then deleting any rows that do not have one of those minimum `id` values.

Make sure to test this query on a sample dataset before running it on your actual table to ensure it works as expected. 