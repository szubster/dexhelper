## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) can leak sensitive stack traces and internal state. Use `err instanceof Error ? err.message : String(err)` to sanitize log output and mitigate CWE-209.
