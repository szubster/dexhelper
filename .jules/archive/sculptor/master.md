## Critical Learnings
* **Semantic Error Trap:** When extracting constants that happen to share the same value (e.g., \`0x2d0d\` for both English Crystal Main Checksum offset and Japanese Gold/Silver Main Checksum offset), be extremely careful with string replacements. Using identical constants across different logical blocks creates semantic confusion, completely defeating the purpose of the readability refactor. Always double-check that the *name* of the constant logically matches the branch of code it's inserted into, regardless of whether the *value* happens to work.
* **Test Tautology:** Updating mock generation in test files to use the identical constants defined in the source files improves readability but creates tautological tests (tests that pass because they use the same variables, even if the actual underlying numeric values drift or are wrong). In a refactor purely for AI-readability, this is acceptable, but worth noting for structural health.

## Critical Learnings
* **Top-level constants provide semantic mapping:** By adhering to ADR 028 and extracting magic numbers to top-level constants with explicit names (e.g., `PARTY_COUNT_OFFSET_GS`), AI agents can immediately infer the context and purpose of binary read operations in `gen2.ts`.
* **Refactoring Strategy:** Using simple JS replacement scripts avoids truncation issues with `sed` or standard bash replacement in large TypeScript files like the save parsers.

## Critical Learnings
* **Hex vs Decimal Context:** While it is a standard and highly beneficial convention to convert memory offsets from decimal to hexadecimal for binary parsers (making offset arithmetic easier to trace), this logic does *not* apply universally to all numbers in a binary parser.
* **Preserve Base-10 for Logic Bounds:** Converting array lengths, counts (like `TV_SHOWS_COUNT = 25`), loop bounds, or bitwise shift values (like `SECRET_ID_SHIFT = 16`) to hexadecimal actively *hurts* readability for both human and AI parsers. We inherently reason about sizes and counts in base-10.
* **Future Refactors:** When applying hex conversions to magic numbers in parsers, ensure you explicitly separate structural memory offsets (which should be hex) from scalar amounts (which should remain decimal).

## Learnings
* When refactoring large TS files, using a Node script with `.cjs` extension works far better than `sed` and `grep` over bash, preventing truncation and missing substitutions.
* Identifying inline magic numbers in heavily structured binaries (like Pokemon save files) significantly boosts AI parsing predictability since the offsets are strictly bounded to constants.
