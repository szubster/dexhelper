## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object or its message (e.g., `err instanceof Error ? err.message : String(err)`) to `console.error` can leak sensitive internal state or path information. Use generic, non-revealing error messages to mitigate CWE-209.

## Transitive Dependency Audits
**Pattern:** To resolve vulnerabilities inside deep or transitive dependencies found via `pnpm audit` (like `serialize-javascript` vulnerabilities), add a `pnpm.overrides` section to `package.json` with the safe version constraint, and then run `pnpm install` to enforce the resolution throughout the workspace.
