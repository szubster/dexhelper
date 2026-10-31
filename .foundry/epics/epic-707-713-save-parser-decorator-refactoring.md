---
id: epic-707-713-save-parser-decorator-refactoring
type: EPIC
title: Refactor Save Parsers to Utilize ISaveDataReader Decorators
status: PENDING
owner_persona: story_owner
created_at: '2026-10-21'
updated_at: '2026-10-31'
depends_on:
  - epic-707-712-save-data-reader-decorator-implementation
jules_session_id: null
pr_number: null
parent: prd-539-707-save-data-reader-decorator-architecture
tags:
  - saveParser
  - refactor
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# EPIC: Refactor Save Parsers to Utilize ISaveDataReader Decorators

## 1. Context & Objective
With the `ISaveDataReader` Decorators implemented (Offset, SafeBounds, Telemetry), this Epic focuses on refactoring the existing save parsing components (especially Gen 3 section parsers and Gen 1/2 parsers in `src/engine/saveParser/`) to use these new decorators. This eliminates duplicate offset math and manual bounds checking, ensuring clean, centralized adherence to Section 13 schema invariants.

## 2. Requirements & Scope
- Integrate `OffsetDataReaderDecorator`, `SafeBoundsDataReaderDecorator`, and `TelemetryDataReaderDecorator` into existing save parser instances in `src/engine/saveParser/`.
- Remove duplicated offset arithmetic and manual bounds checking from existing parser logic.
- Ensure all refactored parsers pass their existing test suites (or update tests to account for new exceptions like `SaveFileCorruptedError`).

## Acceptance Criteria
- [ ] Break down this Epic into Stories for the Tech Lead.
- [ ] Generate a final Story dedicated exclusively to Integration and E2E Verification.
