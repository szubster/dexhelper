---
id: task-121-220-gen3-tv-block-parser-retry-qa
type: TASK
title: QA Gen 3 TV Block DataView Parser (Retry)
status: ACTIVE
owner_persona: qa
created_at: '2026-06-23'
updated_at: '2026-06-30'
depends_on:
  - task-121-219-gen3-tv-block-parser-retry-impl
jules_session_id: '10619841385818447542'
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - qa
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 TV Block DataView Parser (Retry)

## Description
Verify the implementation of the Gen 3 TV block `DataView` parser to ensure it correctly and safely parses the data according to the architecture guidelines and the findings from `research-121-216`.

**Validation Note (2026-06-30):** Rejected `task-121-219-gen3-tv-block-parser-retry-impl`. The implementer correctly used `DataView` but violated the strict constraint against inline magic numbers by using `21` and `40` directly in the `parseGen3MixRecords` conditional check instead of defining them as module-level reusable constants. The task has been failed and sent back for retry.

## Acceptance Criteria
- [ ] Verify the TV block extraction logic uses `DataView` exclusively, with no legacy `Uint8Array` manual read methods.
- [ ] Verify all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. No inline magic numbers.
- [ ] Verify `RangeError` exceptions are gracefully caught and translated into descriptive structural errors.
- [ ] Ensure existing Gen 1 and Gen 2 parsers remain unbroken by running the full test suite.

## Important Protocols (For QA)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
