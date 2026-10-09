---
id: task-474-668-gen3-condition-stats-tests-coder
type: TASK
title: Write Unit Tests for Gen 3 Condition Stats Extraction
status: READY
owner_persona: coder
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
confidence_score: 100
pr_number: null
parent: story-134-474-gen3-condition-stats-extraction-tests
tags:
  - gen3
  - save-engine
  - data-extraction
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Write Unit Tests for Gen 3 Condition Stats Extraction

## Objective
Write comprehensive unit tests to verify the `parseGen3ConditionStats` logic in `src/engine/saveParser/parsers/gen3.ts`.

## Context
The logic for parsing Gen 3 Contest Condition Stats is already implemented. We need tests ensuring that it correctly extracts the Condition values (Cool, Beauty, Cute, Smart, Tough, Feel) based on exact offsets from the E substructure, correctly accounts for base offsets passed into the function, and correctly handles out-of-bounds reads.

## Acceptance Criteria
- [x] Implement unit tests covering standard extraction with a base offset of 0.
- [x] Implement unit tests covering standard extraction with a non-zero base offset (e.g., offset 12).
- [x] Implement unit tests verifying out-of-bounds access throws the correct "The save file is corrupted or incomplete." error.
- [x] Ensure `pnpm test -t "parseGen3ConditionStats"` passes without regressions.
