# Parameterized Tests Over Loops

When writing tests that iterate over multiple cases or permutations (e.g., testing multiple PV values against substructure permutations), you must use Vitest's parameterized testing API (`it.each` or `test.each`) instead of standard `for` loops.

## Reason
- Parameterized tests create distinct, isolated test cases in the test runner's output, making it much easier to identify exactly which case failed.
- A standard `for` loop within a single `it` block will fail the entire block on the first error, hiding the results of subsequent cases and making debugging difficult.
- It aligns with the project's testing standards for robust and readable test suites.
