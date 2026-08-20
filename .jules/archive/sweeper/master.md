## Learnings
* **Implicit File Dependencies (`test-setup.ts`)**: I initially removed `src/test-setup.ts` without fully reading the context and ignored the warning that test setups implicitly depend on files (even if `knip` flagged it as unused). After realizing the test-suite failure, I investigated its usages and removed it from `knip.json` safely without deleting the actual environment configuration.
* **Knip Error Fixing**: `knip` will surface errors if files in its `ignore` block do not exist. Therefore, we should only clean it up.

## Learnings
* **Leftover knip config**: `zod` was still listed in `ignoreDependencies` in `knip.json` even though it was not in `package.json`. Knip flagged this as a configuration issue (`Module load error` or similar warning, although it actually just showed `zod` next to `Remove from ignoreDependencies`). Removing it from `knip.json` safely resolves the warning.
* **Implicit File Dependencies (`test-setup.ts`)**: I recalled that previously removing `src/test-setup.ts` without full context caused test-suite failures, so checking implicit usages is always important, even for seemingly simple config changes.
