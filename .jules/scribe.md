# Master Journal: Scribe

## Session: 2026-08-01-03-05-13
# Scribe Journal - Gen 3 JSDoc

When creating JSDoc for complex binary parsing logic, ensure you document the 'why' and the specific bitwise math. Bitwise operations like `(flag >> FLAG_BYTE_SHIFT)` and `(flag & FLAG_BIT_MASK)` are non-obvious to standard UI developers and warrant explicit inline comments. Also, when extracting boolean states from a dense event flags block (e.g. Move Tutors), document the multi-byte block structure used to fetch the data.

## Session: 2026-08-02-03-02-36
# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), it is crucial to explain the architectural 'why' behind the logic, such as the A/B bank flash memory architecture in Generation 3, which alternates between 56KB banks to prevent data corruption.
- While adding inline comments is helpful, providing a more comprehensive update by also including JSDoc annotations on exported APIs makes the documentation effort much more complete and valuable.

## Session: 2026-08-03-03-09-10
# Scribe Session Log

- Task: Add architecture overview to Gen 2 save parser (`src/engine/saveParser/parsers/gen2.ts`).
- Observation: When analyzing memory operations in Gen 2, it is critical to note that version detection (Gold/Silver vs Crystal) dictates all base offsets. Instead of static offset maps, the codebase heavily utilizes ternary operations predicated on the `isCrystal` boolean. Inventory parsing also features dynamic length-prefixed lists rather than fixed structs.
- Rule: Ensure architectural documentation does not hallucinate hex offsets or complex structures (e.g., roaming legendaries) if they are not definitively proven in the `run_in_bash_session` output. Strict adherence to grounded facts is required.

## Session: journal
Journal entry: Failed the first code review due to missing 'meaningful documentation gap'. The reviewer correctly observed that adding a type to a JSDoc block in a TypeScript codebase is redundant. For the next iteration, I should document a highly complex logic block that is currently lacking inline comments, such as the detectVersionAndOffsets heuristic in gen1.ts, or the memory offset logic in gen3.ts to actually provide value to future developers reading the code.

## Session: session-fix
# Scribe Memory

- When adding JSDoc comments to complex parsing domains (like `src/engine/saveParser/parsers/gen3.ts`), focus on explaining the architectural 'why' (e.g., A/B bank flash memory architecture, Swarms altering encounter tables) rather than just restating what the function arguments are.

