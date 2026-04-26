## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) or even conditionally logging `err.message` or `String(err)` can leak sensitive stack traces, paths, and internal state. Explicitly replace raw error messages with static generic strings in generic `console.error` handlers (e.g., `console.error('System: sync failed')`) to prevent leaking sensitive state and fully mitigate CWE-209.

## Transitive Dependency Audits
**Pattern:** To resolve vulnerabilities inside deep or transitive dependencies found via `pnpm audit` (like `serialize-javascript` vulnerabilities), add a `pnpm.overrides` section to `package.json` with the safe version constraint, and then run `pnpm install` to enforce the resolution throughout the workspace.

## IndexedDB Save Storage
**Pattern:** The `window.atob` Base64 decoder is insecure. Instead of doing base64 serialization with handwritten code, or installing base-64 dependencies, the save file storage logic should be migrated completely to `IndexedDB` which natively supports ArrayBuffers and avoids this issue altogether.

## IndexedDB Migration Correctness
**Pattern:** When migrating localStorage usage to IndexedDB (`saveDB`), remember to update all test implementations and type boundaries. If using `saveDB` methods like `.getSave()`, they return promises and must be `await`ed. Ensure any `ArrayBufferLike` conversion logic accurately casts using `as ArrayBuffer` if TypeScript strictness complains about `SharedArrayBuffer` incompatibilities.
