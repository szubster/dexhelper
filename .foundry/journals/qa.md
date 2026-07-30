# QA Journal

## Task Verification & Memory Recording
When verifying tasks that involve adding or modifying parsers for save files (like `task-124-172-gen3-mix-record-events-parser`), make sure to closely inspect that they properly catch `RangeError` from the `DataView` API when checking for out-of-bounds reads.
Always ensure you run `pnpm lint && pnpm test` to verify no regressions were introduced.
When you finish reviewing a node, do not modify the YAML frontmatter. Update only the markdown body by checking off the Acceptance Criteria.

## 2026-06-30: Magic Numbers in Gen 3 Parser Retry
The implementer (`coder`) failed `task-121-219-gen3-tv-block-parser-retry-impl` because they used inline magic numbers (`21` and `40`) in `parseGen3MixRecords` to check for Mix Record events, despite the task description explicitly forbidding inline magic numbers and a previous rejection for the same reason (documented in `research-121-216`). This indicates a recurring failure pattern where the coder ignores module-level constant requirements for bounds checking. We must enforce this architectural constraint strictly to prevent fragile parsing logic.

## Shiny Carrier Badge Rejection
- **Date**: 2026-07-05
- **Node**: task-253-260-shiny-carrier-ui-badge-impl
- **Reason**: The developer implemented the Shiny Carrier UI badges (e.g., animate-[pulse...] divs in PokemonDetails.tsx and StorageGrid.tsx) without the mandated `border-dashed` class, violating ADR 008's strict tactical hardware aesthetic constraints.

## 2026-07-16 - Rejection: Missing Architectural Integration
- **Node**: `task-085-142-gen2-mystery-gift-qa` (and numerous similar tasks across sprints)
- **Constraint Violation**: The implementation failed to explicitly build the React Context and Hook architecture mandated by ADR 013 and ADR 017. The coder faked the solution by directly wiring simple UI fixes or modifying data loading logic locally, bypassing the required top-level architectural layer. This leads to brittle, localized state rather than robust, globally available hooks.
- **Action**: Rejected the implementation with FAILED status and incremented `rejection_count`. Placed a comprehensive "Auditor Rejection" block in the QA task body explicitly detailing the missing architectural layers (e.g., `src/contexts/MysteryGiftContext.tsx`, `src/hooks/useMysteryGift.ts`). Future coders MUST implement these systemic hooks before building the UI presentation layer.

## 2026-07-21: Rejection - Absolute Offsets vs Relative Offsets
- **Node**: `task-120-277` (Feebas Seed QA), `task-113-265` (Volcanic Ash QA)
- **Constraint Violation**: The developer implemented memory offsets using absolute values (e.g. `0x0006`, `0x142C`), violating ADR 028 and the task's explicit Acceptance Criteria which mandate relative offsets via `section1Offset` / dynamically resolved offsets. Absolute offsets are prone to shifting depending on save file regions/versions.
- **Action**: Failed the tasks. Coders MUST use relative offsets (e.g. `section1Offset + 0x0006`) to ensure save file parsing remains resilient.

## 2026-07-21
- **Constraint Violation**: Submitted Empty PR with unchecked Acceptance Criteria.
- **Node**: task-320-323-gen2-tm-hm-parsing-qa
- **Action**: Per ADR 007, Empty PRs submitted for pre-existing completed implementations MUST check off their acceptance criteria in the markdown body before submission. Submitting an empty PR with unchecked boxes violates the completeness requirement.

## 2026-07-24
- **Learning**: When creating tests for data extraction features (e.g. `extractGen2PhoneContacts`), it is vital to map the mocked byte arrays (offsets) correctly according to the actual schema documented in the project rules (e.g. 10 slots of 12 bytes each, starting at offset `0x0E5D` + offset adjustment `0x1E09`). Off-by-one errors or incorrectly interpreting documentation offsets can lead to failing tests and wasted debugging cycles. Always double-check offset mathematics.
