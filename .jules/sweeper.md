## Learnings
* **Leftover knip config**: Obsolete file references (like `.github/scripts/schema.ts`) and dependencies (like `zod`) left in `knip.json` `ignore` or `ignoreDependencies` blocks will cause `knip` to flag errors if they do not exist or are correctly imported. Removing them safely resolves the warnings.
* **Implicit File Dependencies (`test-setup.ts`)**: Knip may flag test setup files as unused because they are implicitly loaded by test runners rather than explicitly imported. Do not delete them without checking test-suite context; instead, adjust the knip configuration safely.
