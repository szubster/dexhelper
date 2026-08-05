# Sculptor Journal - Gen 2 Magic Numbers

## Critical Learnings
* **Top-level constants provide semantic mapping:** By adhering to ADR 028 and extracting magic numbers to top-level constants with explicit names (e.g., `PARTY_COUNT_OFFSET_GS`), AI agents can immediately infer the context and purpose of binary read operations in `gen2.ts`.
* **Refactoring Strategy:** Using simple JS replacement scripts avoids truncation issues with `sed` or standard bash replacement in large TypeScript files like the save parsers.
