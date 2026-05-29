# Sweeper Journal

## General
- When using `knip` to find unused files, be aware that test files (e.g. `__tests__/*.test.tsx`) that import unused code will prevent `knip` from identifying the code as dead, since test files act as valid entry points for imports. Deleting both the dead code and its associated tests is required.
