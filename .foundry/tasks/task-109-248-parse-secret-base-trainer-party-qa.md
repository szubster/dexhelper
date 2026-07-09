---
id: task-109-248-parse-secret-base-trainer-party-qa
type: TASK
title: QA - Gen 3 Secret Base Trainer and Party Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-06-30'
updated_at: '2026-07-09'
depends_on:
  - task-109-247-parse-secret-base-trainer-party
jules_session_id: '15726844382950780990'
pr_number: null
parent: story-070-109-extract-mixed-record-trainer-data
tags:
  - qa
  - gen3
  - save-parsing
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Gen 3 Secret Base Trainer and Party Parsing

## Context
The coder has implemented the parsing logic for Gen 3 Secret Base trainer information and their party Pokémon. Your job is to verify this implementation.

## Verification Protocol
1. Verify that the coder used exclusively the `DataView` API (no raw `Uint8Array` access).
2. Verify that all memory offsets (e.g. `0x34` for party), lengths, and bit locations are defined as reusable constants at the module level (no inline magic numbers).
3. Ensure tests adequately cover bounds-checking / graceful failure.

## Directives
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort permanently (impossible or max rejections), you MUST update to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Verify `DataView` API is used exclusively.
- [ ] Verify module-level constants are used instead of magic numbers for offsets.
- [ ] Verify comprehensive unit tests are present.
