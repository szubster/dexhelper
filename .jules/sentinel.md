## 2026-04-19 - saveParser fallback coverage
**What:** Improved test coverage for the save parser engine, specifically covering fallback paths and structural validations when checksums are invalid.
**Coverage Before/After:** Increased `src/engine/saveParser/index.ts` coverage significantly from ~62% to ~89%.
**Why this target matters:** The save parser is a core engine module and critical for parsing user files correctly. By validating fallbacks when checksums fail (a common real-world scenario), we ensure more resilient data parsing.
**Learning:** When writing tests to verify error handling, avoid using try/catch blocks with empty catches, as they silently swallow unexpected errors and result in false positive passes. Use `expect(() => ...).toThrow(...)` instead.
