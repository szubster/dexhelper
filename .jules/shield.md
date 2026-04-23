## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) can leak sensitive stack traces and internal state. Use `err instanceof Error ? err.message : String(err)` to sanitize log output and mitigate CWE-209.

## Transitive Dependency Audits
**Pattern:** To resolve vulnerabilities inside deep or transitive dependencies found via `pnpm audit` (like `serialize-javascript` vulnerabilities), add a `pnpm.overrides` section to `package.json` with the safe version constraint, and then run `pnpm install` to enforce the resolution throughout the workspace.

## Insecure `window.atob` usage
**Pattern:** `window.atob` is insecure and can fail unexpectedly for certain Base64 representations. Since `atob` does native browser DOM string conversions, avoiding it handles decoding more robustly in memory. Replace `window.atob` with a robust base64 decoding library like `base-64`.
