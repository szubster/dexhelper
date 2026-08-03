# Sculptor Journal - Hexadecimal Formatting

## Critical Learnings
* **Hex vs Decimal Context:** While it is a standard and highly beneficial convention to convert memory offsets from decimal to hexadecimal for binary parsers (making offset arithmetic easier to trace), this logic does *not* apply universally to all numbers in a binary parser.
* **Preserve Base-10 for Logic Bounds:** Converting array lengths, counts (like `TV_SHOWS_COUNT = 25`), loop bounds, or bitwise shift values (like `SECRET_ID_SHIFT = 16`) to hexadecimal actively *hurts* readability for both human and AI parsers. We inherently reason about sizes and counts in base-10.
* **Future Refactors:** When applying hex conversions to magic numbers in parsers, ensure you explicitly separate structural memory offsets (which should be hex) from scalar amounts (which should remain decimal).
