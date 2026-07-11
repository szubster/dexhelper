# QA Journal

## Task Verification & Memory Recording
When verifying tasks that involve adding or modifying parsers for save files (like `task-124-172-gen3-mix-record-events-parser`), make sure to closely inspect that they properly catch `RangeError` from the `DataView` API when checking for out-of-bounds reads.
Always ensure you run `pnpm lint && pnpm test` to verify no regressions were introduced.
When you finish reviewing a node, do not modify the YAML frontmatter. Update only the markdown body by checking off the Acceptance Criteria.

## Gen 2 Breeding Algorithm Constraints
## 2026-06-30: Magic Numbers in Gen 3 Parser Retry
The implementer (`coder`) failed `task-121-219-gen3-tv-block-parser-retry-impl` because they used inline magic numbers (`21` and `40`) in `parseGen3MixRecords` to check for Mix Record events, despite the task description explicitly forbidding inline magic numbers and a previous rejection for the same reason (documented in `research-121-216`). This indicates a recurring failure pattern where the coder ignores module-level constant requirements for bounds checking. We must enforce this architectural constraint strictly to prevent fragile parsing logic.

## Shiny Carrier Badge Rejection
- **Date**: 2026-07-05
- **Node**: task-253-260-shiny-carrier-ui-badge-impl
- **Reason**: The developer implemented the Shiny Carrier UI badges (e.g., animate-[pulse...] divs in PokemonDetails.tsx and StorageGrid.tsx) without the mandated `border-dashed` class, violating ADR 008's strict tactical hardware aesthetic constraints.

## 2026-07-09

**Task**: task-109-248-parse-secret-base-trainer-party-qa (QA for task-109-247-parse-secret-base-trainer-party)
**Outcome**: Passed Validation
**Notes**:
- Verified that `DataView` API is used exclusively in `src/engine/gen3/secretBase/parser.ts` for all read operations (e.g. `getUint32`, `getUint16`, `getUint8`).
- Verified that all offsets, lengths, and bit locations are defined as reusable constants at the module level.
- Verified that comprehensive unit tests are present, including checking for out-of-bounds reads throwing `The save file is corrupted or incomplete.` when catching `RangeError`.

## 2026-07-11: Trick House Parser Rejection
- **Date**: 2026-07-11
- **Node**: task-276-304-gen3-trick-house-parser-impl
- **Reason**: The developer failed to handle `RangeError` from the `DataView` API when checking for out-of-bounds reads. This is a critical requirement for parsers working with save file data to prevent crashes when dealing with corrupted or incomplete saves.
## 2026-07-11 - Feebas Extraction Failed (Task: task-280-305-feebas-backend-integration-qa)
The coder implemented the Feebas extraction logic using absolute memory offsets (`0x2dd6`) instead of making them relative to `section1Offset`. In Generation 3, save files utilize an A/B bank rotation system where data can either reside in `0x0000` or `0xE000`. By hardcoding the absolute offset, the parser will fail to read the active save data if it currently resides in Bank B.

To enforce the architecture correctly, all dynamic save block extraction functions must receive the resolved offset from the parser engine (e.g., `section1Offset` or `section2Offset`) and apply relative memory offsets to correctly extract the active save data block. I have failed `task-280-304-feebas-backend-integration` and incremented its rejection count.
