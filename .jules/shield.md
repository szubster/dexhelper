## Sanitize error logging to prevent CWE-209 information leakage
**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) or even conditionally logging `err.message` or `String(err)` can leak sensitive stack traces, paths, and internal state. Explicitly replace raw error messages with static generic strings in generic `console.error` handlers (e.g., `console.error('System: sync failed')`) to prevent leaking sensitive state and fully mitigate CWE-209.

## Transitive Dependency Audits
**Pattern:** To resolve vulnerabilities inside deep or transitive dependencies found via `pnpm audit` (like `serialize-javascript` vulnerabilities), add a `pnpm.overrides` section to `package.json` with the safe version constraint, and then run `pnpm install` to enforce the resolution throughout the workspace.

## IndexedDB Save Storage
**Pattern:** The `window.atob` Base64 decoder is insecure. Instead of doing base64 serialization with handwritten code, or installing base-64 dependencies, the save file storage logic should be migrated completely to `IndexedDB` which natively supports ArrayBuffers and avoids this issue altogether.
\n**Pattern:** Directly passing the error object (e.g., `catch(console.error)`) or even conditionally logging `err.message` or `String(err)` can leak sensitive stack traces, paths, and internal state. Explicitly replace raw error messages with static generic strings in generic `console.error` handlers (e.g., `console.error('System: sync failed')`) to prevent leaking sensitive state and fully mitigate CWE-209.
## Improving Scheduled Prompts
**Pattern:** If no specific code vulnerability is found and the task instructs to improve the scheduled prompt or perform a dependency audit (`pnpm audit`), you can add new scan vectors to the scheduled prompt, such as Prototype Pollution with `Object.assign`.

## Adding New Security Audit Vectors
**Pattern:** When no application code vulnerabilities or dependencies issues are identified during a routine sweep, updating the scheduled prompt (`.jules/schedules/shield.md`) with new scan vectors is an essential maintenance task. New scan vectors should target common web vulnerabilities (e.g., Open Redirects, Unsafe Deserialization, LocalStorage Information Leakage) to ensure the prompt remains robust and effective for future audits.

## Adding New Security Audit Vectors
**Pattern:** Added Regular Expression Denial of Service (ReDoS) and `postMessage` event origin validation as new scan vectors to the scheduled prompt (`.jules/schedules/shield.md`). This expands the automated security checks to cover potential regex vulnerabilities on user inputs and insecure cross-origin communication.

## Adding New Security Audit Vectors
**Pattern:** Added Path Traversal, Tab-nabbing, and Environment Variable Leakage as new scan vectors to the scheduled prompt (`.jules/schedules/shield.md`). This expands the automated security checks to cover potential external communication vulnerabilities, insecure window openings, and sensitive environment data exposure.

## Adding New Security Audit Vectors
**Pattern:** Added Server-Side Request Forgery (SSRF), Cross-Site Request Forgery (CSRF), Content Security Policy (CSP) checking, and GraphQL query injection as new scan vectors to the scheduled prompt (`.jules/schedules/shield.md`). This expands the automated security checks to cover potential external communication vulnerabilities, insecure requests, and injection attacks.
