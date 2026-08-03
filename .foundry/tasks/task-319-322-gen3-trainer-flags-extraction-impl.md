---
id: task-319-322-gen3-trainer-flags-extraction-impl
type: TASK
title: Implement Gen 3 Trainer Defeat Flags Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-07-14'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: '14705223320702806678'
pr_number: null
parent: story-307-319-gen3-trainer-flags-extraction
tags:
  - data-extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Trainer Defeat Flags Extraction

## Objective
Implement the logic to extract standard and rematch trainer defeat flags from Gen 3 save files to be used by the Missed Trainer Radar.

## Contract & Constraints
1. **Gen 3 Data Parsing (ADR 010):** All new Gen3 save parsing logic MUST exclusively use the native `DataView` API rather than raw `Uint8Array` manipulations. You must catch `RangeError` for out-of-bounds reads and throw a new error with the exact message 'The save file is corrupted or incomplete.'
2. **Cured Boundaries (ADR 026):** All flag extractions must utilize explicit bitwise masking and shifting.
3. **Relative Offsets (ADR 028):** All memory offsets, lengths, bit locations, and shifts must be explicitly defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
4. **Resolved Section Offsets:** You MUST use the resolved section offset (e.g., `section1Offset`) to calculate relative memory offsets instead of hardcoded absolute offsets to properly support A/B bank flash memory.
5. **Data Structure:** The extracted flags must be structured correctly for use in the UI.

## Acceptance Criteria
- [ ] Implement `DataView` parsing for standard trainer defeat flags.
- [ ] Implement `DataView` parsing for rematch trainer defeat flags.
- [ ] Ensure all offsets and bit shifts are module-level constants.
- [ ] Ensure A/B bank relative offset logic is used.
- [ ] Add unit tests covering extraction logic (including absolute zero and boundary states per ADR 026).

## Node Handling Policies
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Submission:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not manually update the status.
