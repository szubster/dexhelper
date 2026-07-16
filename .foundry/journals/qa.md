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

## Gen 3 Volcanic Ash Extraction Validation
- **Pattern**: When validating Gen 3 dynamic save block extraction, ensure that offsets are not hardcoded absolute values (e.g. `0x13D0` or `0x142C`). They must be calculated relative to the dynamically resolved `section1Offset`.
- **Outcome**: Rejected `task-267-261-gen3-ash-dataview-extraction-impl` due to hardcoded absolute offsets instead of using the `section1Offset + offset` calculation.

## Gen 3 Volcanic Ash Extraction Permanent Failure
- **Date**: 2026-07-12
- **Node**: task-267-261-gen3-ash-dataview-extraction-impl
- **Reason**: The developer reached max rejections by faking the relative offset calculation fix. They kept the absolute memory offsets and performed math manipulation, violating ADR 028.

## 2026-07-13 - Feebas Extraction Permanent Failure (Task: task-280-305-feebas-backend-integration-qa)
The coder failed to properly implement relative memory offsets using `section1Offset` for Feebas seed extraction after multiple rejections. They used `section2Offset` instead of `section1Offset`, violating the architecture requirements of the Gen 3 A/B bank flash memory system. As they have reached the maximum rejection count, I have permanently failed the `task-280-304-feebas-backend-integration` by setting its status to `CANCELLED`.

## 2026-07-15: PC Box Diff Engine Rejection
- **Date**: 2026-07-15
- **Node**: task-294-316-diff-engine-impl
- **Reason**: The developer implemented `calculateBoxDiff` with a fallback hash generator instead of strictly relying on the `hash` property on `PokemonInstance` as required by the contract. Furthermore, the `hash` property does not even exist on the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts`. This demonstrates a failure to update the underlying interface to match the technical requirements.
## Canonical Pattern: Enforcing Gen 3 A/B Bank Relative Offsets (ADR 028)
- **Constraint**: When validating Gen 3 dynamic save block extraction (e.g., Feebas seed, Volcanic Ash), ensure that offsets are never hardcoded as absolute values (e.g., `0x2dd6`, `0x13D0`).
- **Why**: Generation 3 save files utilize an A/B bank rotation system where data can reside in `0x0000` or `0xE000`. Absolute offsets will fail to read the active save data if it resides in Bank B.
- **Enforcement**: All dynamic save block extraction functions must receive the resolved offset from the parser engine (e.g., `section1Offset` or `section2Offset`) and apply relative memory calculations (`section1Offset + offset`). Recurring rejections and permanent failures have occurred because developers fake the fix or use the wrong section offset.
>>
### Session `14789660571036105515`

- **Task**: `task-258-264-egg-move-precomputation-etl-qa`
- **Result**: Checked and fixed the BFS egg move generation logic. Added logic for Smeargle (who sketches any move), Nidoran lines, Volbeat/Illumise, and Hitmon families breeding. Precomputed paths are generating.
- **Action**: Modified `scripts/generate-pokedata.ts`, validated output, updated acceptance criteria, completed checks and tests successfully.
