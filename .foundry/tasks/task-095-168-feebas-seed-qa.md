---
id: task-095-168-feebas-seed-qa
type: TASK
title: QA Feebas Seed Extraction
status: PENDING
owner_persona: qa
created_at: '2026-06-08'
updated_at: '2026-06-12'
depends_on:
  - task-095-167-feebas-seed-impl
jules_session_id: null
pr_number: null
parent: story-058-095-feebas-seed-extraction
tags:
  - gen3
  - backend
  - save-parsing
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Feebas Seed Extraction

## Objective
Verify the implementation of `extractFeebasSeed` in `src/engine/gen3/feebas.ts`.

## Verification Steps
1. Read `src/engine/gen3/feebas.ts`. Verify it uses `DataView` API directly and catches `RangeError` correctly as specified by ADR 010.
2. Ensure the offsets used for Ruby/Sapphire and Emerald are correct (`0x2DD6` and `0x2E66`).
3. Run the unit tests (`pnpm test`) and ensure tests verify the handling of `RangeError`.

## Acceptance Criteria
- [ ] Code properly follows ADR 010 restrictions (DataView + explicit RangeError catch).
- [ ] Version offsets verified.
- [ ] Unit tests pass and assert corrupted save handling.

**CRITICAL:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
