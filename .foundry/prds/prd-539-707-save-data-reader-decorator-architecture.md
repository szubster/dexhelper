---
id: prd-539-707-save-data-reader-decorator-architecture
type: PRD
title: Composable Decorator Pattern Architecture for ISaveDataReader Binary Parsers
status: READY
owner_persona: epic_planner
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-539-save-data-reader-decorator-architecture
tags:
  - saveParser
  - architecture
  - refactor
  - design-pattern
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# PRD: Composable Decorator Pattern Architecture for ISaveDataReader Binary Parsers

## 1. Context & Problem Statement
Currently, the save parsing components in `src/engine/saveParser/` interact directly with `SaveDataReader` instances or low-level `DataView` structures. Operations like applying section-relative offsets in Gen 3 flash memory or executing bounds checks to detect save corruption lead to duplicate offset arithmetic, manual wrapping, and cluttered logic. Section 13 of `.foundry/docs/schema.md` mandates relative offset handling and strict `RangeError` bounds validation across all Gen 3 save extraction functions. To fix this, we need a composable pattern.

## 2. Proposed Architecture & Solution
We will implement the Decorator design pattern for the `ISaveDataReader` interface (`src/engine/saveParser/SaveDataReader.ts`). This pattern allows us to wrap any base reader and dynamically add behavior without changing the consumer's call site.

The core implementation will include:
1. **ISaveDataReader Interface Enforcement:** All decorators must implement `ISaveDataReader` to guarantee composability.
2. **OffsetDataReaderDecorator:** A decorator that shifts all read calls by a given base offset (e.g., `section1Offset`), adhering strictly to Section 13's relative offset requirements.
3. **SafeBoundsDataReaderDecorator:** A decorator that catches `RangeError` exceptions during out-of-bounds reads and throws a customized `SaveFileCorruptedError` with contextual offset information.
4. **TelemetryDataReaderDecorator:** A decorator that records read operations (offsets and lengths) for debugging and diagnostic reporting on corrupted save files.

## 3. Product Value & Impact
By adopting this architecture, we will:
- Greatly improve modularity within `src/engine/saveParser/`.
- Eliminate duplicated offset math and bounds checking logic across parsers.
- Make unit testing easier by using mock or decorated readers.
- Ensure strict, centralized adherence to Section 13 schema invariants out of the box.

## 4. Requirements & Scope
- Create the decorator implementations: `OffsetDataReaderDecorator`, `SafeBoundsDataReaderDecorator`, `TelemetryDataReaderDecorator`.
- All decorators must seamlessly fulfill the `ISaveDataReader` interface.
- Provide comprehensive unit tests covering standard behavior, boundary conditions, and error mapping (e.g., throwing `SaveFileCorruptedError`).
- Refactor the existing Gen 3 section parsers (and any relevant Gen 1/2 parsers) to use these new decorators.

## 5. Exclusions (Out of Scope)
- Changes outside of the `src/engine/saveParser/` namespace that do not deal with binary data reading.
- Major UI or overarching system changes not directly tied to testing or providing the reader telemetry.

## Acceptance Criteria
- [ ] Generate an Epic dedicated to building the `ISaveDataReader` Decorators.
- [ ] Generate an Epic dedicated to refactoring existing parsers to use the Decorators.
