## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) can leak sensitive stack traces and internal state. Use `err instanceof Error ? err.message : String(err)` to sanitize log output and mitigate CWE-209.

## Transitive Dependency Audits
**Pattern:** To resolve vulnerabilities inside deep or transitive dependencies found via `pnpm audit` (like `serialize-javascript` vulnerabilities), add a `pnpm.overrides` section to `package.json` with the safe version constraint, and then run `pnpm install` to enforce the resolution throughout the workspace.

## IndexedDB Save Storage
**Pattern:** The `window.atob` Base64 decoder is insecure. Instead of doing base64 serialization with handwritten code, or installing base-64 dependencies, the save file storage logic should be migrated completely to `IndexedDB` which natively supports ArrayBuffers and avoids this issue altogether.
