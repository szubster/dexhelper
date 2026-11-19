
# Gen 3 Fossil Offsets Memory

When calculating bitwise mapping constants for Gen 3 `flags` or `vars`, always explicitly compute and document the **Relative Byte Offset** from the start of the array, not just the absolute offset, because implementation tasks require relative offsets to correctly read bit flags dynamically without magic numbers.

For example, if the flags array starts at `0x1220` and the flag is at `0x1249`, the relative offset is `0x29`.
