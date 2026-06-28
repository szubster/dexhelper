---
id: task-130-239-move-jsonl-compaction-qa
type: TASK
title: Verify Move JSONL Compaction
status: PENDING
owner_persona: qa
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on:
  - task-130-238-move-jsonl-compaction-impl
jules_session_id: null
pr_number: null
parent: story-086-130-move-jsonl-compaction
tags:
  - refactor
  - build
  - db
  - qa
research_references:
  - adr-049-025-dynamic-pokedata-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Verify Move JSONL Compaction

## Background
The implementation task `task-130-238-move-jsonl-compaction-impl` was meant to update the generation script `scripts/generate-pokedata.ts` to compact `moves.jsonl` by stripping out nulls, undefined values, and defaults like accuracy 100, according to ADR 025. This QA task verifies that implementation.

## Verification Steps
1. Review the changes in `scripts/generate-pokedata.ts` made by the Coder.
2. Confirm the `compact()` function strips out move `p` (power) when it is 0 or null.
3. Confirm the `compact()` function strips out move `acc` (accuracy) when it is 100 or null.
4. Run the data generation script (`pnpm data:gen` or equivalent) and verify the resulting `moves.jsonl` output file in `data/db/` or `scripts/data/db/`.
5. Check some sample records in the output JSONL file to ensure `p` is missing if power is 0, and `acc` is missing if accuracy is 100.
6. Verify no other required fields from ADR 025 were inadvertently dropped.

## Acceptance Criteria
- [ ] The `moves.jsonl` file correctly omits `p` (power) when 0 or null.
- [ ] The `moves.jsonl` file correctly omits `acc` (accuracy) when 100 or null.
- [ ] The payload matches the expected schema per ADR 025.

## Important Note for QA
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If the coder's implementation fails to meet the criteria, you MUST update the coder's task frontmatter (set `status: FAILED`, provide a `rejection_reason`, increment `rejection_count`), leave its Acceptance Criteria unchecked, and document the failure in the QA journal. Do not modify this QA task's YAML frontmatter for rejection.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
