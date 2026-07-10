---
id: task-121-281-gen3-tv-block-parser-retry4-qa
type: TASK
title: QA Gen 3 TV Block DataView Parser (Retry 5)
status: PENDING
owner_persona: qa
created_at: '2026-07-06'
updated_at: '2026-07-06'
depends_on:
  - task-121-280-gen3-tv-block-parser-retry4-impl
jules_session_id: null
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

# Task: QA Gen 3 TV Block DataView Parser (Retry 5)

CANCELLED: Replaced by task-121-305-gen3-tv-block-parser-retry5-qa.

## Description
Verify the implementation of the Gen 3 TV block `DataView` parser to ensure it correctly and safely parses the data according to the architecture guidelines and the findings from `research-121-246-gen3-tv-block-parser-retry-failure`.

## Acceptance Criteria
- [ ] Verify the TV block extraction logic uses `DataView` exclusively, with no legacy `Uint8Array` manual read methods.
- [ ] Verify all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level. No inline magic numbers. Specifically check for `TVGROUP_RECORD_MIX_START` (21), `TVGROUP_RECORD_MIX_END` (40), and `TVSHOW_STRUCT_SIZE` (36) to ensure they are handled properly based on the research.
- [ ] Verify `RangeError` exceptions are gracefully caught and translated into descriptive structural errors.
- [ ] Ensure existing Gen 1 and Gen 2 parsers remain unbroken by running the full test suite.

## Important Protocols (For QA)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Protocol:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
