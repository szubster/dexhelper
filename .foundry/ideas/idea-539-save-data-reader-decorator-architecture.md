---
id: idea-539-save-data-reader-decorator-architecture
type: IDEA
title: Composable Decorator Pattern Architecture for ISaveDataReader Binary Parsers
status: PENDING
owner_persona: product_manager
created_at: '2026-10-18'
updated_at: '2026-10-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

# Idea: Composable Decorator Pattern Architecture for ISaveDataReader Binary Parsers

## Problem
Currently, save parsing components in `src/engine/saveParser/` rely directly on `SaveDataReader` instances or low-level `DataView` wraps. When handling complex save file operations — such as translating section-relative offsets in Gen 3 A/B flash memory banks, logging memory access telemetry for debugging corrupted save files, or applying strict range/bounds validation — parser code often duplicates offset calculations or wraps reader methods manually. Section 13 of `.foundry/docs/schema.md` explicitly mandates relative offset handling and strict `RangeError` bounds validation across all Gen 3 save extraction functions.

## Proposed Solution
Introduce a composable Decorator/Wrapper architecture implementing the `ISaveDataReader` interface (`src/engine/saveParser/SaveDataReader.ts`). This pattern will allow wrapping any base `ISaveDataReader` with specialized behavior decorators, including:
1. `OffsetDataReaderDecorator`: Automatically translates all read calls by a fixed base offset (e.g. `section1Offset` or `section2Offset`), ensuring strict compliance with Section 13 relative offset guidelines without modifying call sites.
2. `SafeBoundsDataReaderDecorator`: Intercepts out-of-bounds reads and converts raw `RangeError` exceptions into descriptive `SaveFileCorruptedError` instances with offset context.
3. `TelemetryDataReaderDecorator`: Tracks read access patterns and accessed byte ranges to assist with save file diagnostic reports.

## Value
Elevates code quality and modularity in `src/engine/saveParser/`, eliminates duplicate offset arithmetic across Gen 1-3 parsers, simplifies unit testing via mock/decorated readers, and enforces Section 13 schema invariants out of the box.

## Acceptance Criteria
- [x] PRD generated detailing the `ISaveDataReader` Decorator specification.
- [ ] Decorator implementations (`OffsetDataReaderDecorator`, `SafeBoundsDataReaderDecorator`) added and tested in `src/engine/saveParser/`.
- [ ] Refactored existing Gen 3 section parsers to leverage relative offset decorators.
- [ ] prd-539-707-save-data-reader-decorator-architecture
