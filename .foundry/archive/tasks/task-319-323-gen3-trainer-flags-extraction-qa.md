---
id: task-319-323-gen3-trainer-flags-extraction-qa
type: TASK
title: QA Gen 3 Trainer Defeat Flags Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-14'
updated_at: '2026-08-08'
depends_on:
  - task-319-322-gen3-trainer-flags-extraction-impl
jules_session_id: null
pr_number: null
parent: story-307-319-gen3-trainer-flags-extraction
tags:
  - data-extraction
  - gen3
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Trainer Defeat Flags Extraction

## Objective
Verify the correctness of the Gen 3 Trainer Defeat Flags Extraction implementation according to the architectural constraints.

## Contract & Constraints
1. **Gen 3 Data Parsing (ADR 010):** Verify that all new Gen3 save parsing logic exclusively uses the native `DataView` API and properly catches `RangeError` for out-of-bounds reads.
2. **Cured Boundaries (ADR 026):** Verify that all flag extractions utilize explicit bitwise masking and shifting, and are tested for absolute zero and boundary states.
3. **Relative Offsets (ADR 028):** Verify that all memory offsets, lengths, bit locations, and shifts are explicitly defined as reusable constants at the module level without inline magic numbers.
4. **Resolved Section Offsets:** Verify the use of resolved section offsets (e.g., `section1Offset`) to calculate relative memory offsets.

## Acceptance Criteria
- [x] Review code to verify compliance with ADR 010, 026, and 028.
- [x] Review code to verify correct A/B bank flash memory support via section offset calculations.
- [x] Ensure all required unit tests pass and cover the edge cases.

## Node Handling Policies
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Submission:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not manually update the status.
