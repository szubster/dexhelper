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
