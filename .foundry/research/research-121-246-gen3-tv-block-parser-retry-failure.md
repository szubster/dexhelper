---
id: research-121-246-gen3-tv-block-parser-retry-failure
type: RESEARCH
title: Investigate Gen 3 TV Block Parser Retry Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-02'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - research
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 TV Block Parser Retry Failure

## Objective
Investigate the root cause of the `task-121-219-gen3-tv-block-parser-retry-impl` failure (which reached its max rejection count). Determine why the coder failed to adhere to the strict constraint regarding module-level reusable constants, and define explicit instructions and memory offsets/constants that MUST be used in the next iteration to prevent a recurring QA rejection.

## Instructions
1. Analyze the failure feedback from QA in `task-121-220-gen3-tv-block-parser-retry-qa` (specifically the use of inline magic numbers `21` and `40` in `parseGen3MixRecords`).
2. Identify the correct module-level constant names and values that should replace these magic numbers based on the `gen3_tv_shows_and_events.md` or related knowledge base documents.
3. Document these explicit constants so the next implementer blueprint can mandate their exact usage.
