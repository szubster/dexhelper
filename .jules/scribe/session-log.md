# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- When documenting bitwise operations (like event flag extraction for NPC trades or Move Tutors), clearly outline the math used to locate the byte offset (`flag >> 3`) and the bit index (`flag & 7`) so future developers understand the binary structure being parsed.
- Avoid over-explaining standard bitwise operations if they are obvious, but do document the *structure* of the data they are extracting from.
