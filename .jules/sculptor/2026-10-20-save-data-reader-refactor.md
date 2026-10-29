# Sculptor Journal - 2026-10-20

## Refactoring Goal
Standardize Gen 3 static encounter flag extraction by replacing ad-hoc bitwise helper logic with `SaveDataReader`.

## Actions Taken
- Replaced the custom local `getBit(dataView, offset, bitPosition)` function in `src/engine/gen3/staticEncounters.ts` with `reader.readFlag(offset, bitPosition)` using `SaveDataReader`.

## Critical Learnings
- **Standard abstractions reduce cognitive overhead for AI models:** Ad-hoc bit manipulation helpers scattered across individual module files obscure data extraction interfaces. Reusing standard abstractions like `SaveDataReader` across save parsing modules ensures consistency, improves type safety, and makes code significantly easier for LLMs to navigate and parse predictable control structures.
