---
id: task-333-335-gen3-secret-base-locations-qa
type: TASK
title: QA Gen 3 Secret Base Locations Parser
status: READY
owner_persona: qa
created_at: '2026-07-19'
updated_at: '2026-07-28'
depends_on:
  - task-333-334-gen3-secret-base-locations-impl
jules_session_id: null
pr_number: null
parent: story-324-333-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Locations Parser

## Context
QA verification for the Gen 3 Secret Base Locations parser.

## Verification Requirements
- Verify that `DataView` API is used and `RangeError` exceptions are properly caught and re-thrown with the message: `'The save file is corrupted or incomplete.'` (ADR 010).
- Verify that all memory offsets, lengths, bit locations, and shifts are explicitly defined as reusable constants at the module level. Inline magic numbers are forbidden (ADR 028).
- Verify that relative section offsets (like `section1Offset`) are used instead of absolute offsets.
- Verify that internal location IDs are correctly mapped to Gen 3 map locations.

## Acceptance Criteria
- [ ] Code review passes, ensuring no magic numbers exist and all ADRs are followed.
- [ ] Unit tests cover out-of-bounds reads and correct extraction/mapping.
