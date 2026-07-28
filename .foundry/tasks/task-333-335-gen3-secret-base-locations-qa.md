---
id: task-333-335-gen3-secret-base-locations-qa
type: TASK
title: QA Gen 3 Secret Base Locations Parser
status: ACTIVE
owner_persona: qa
created_at: '2026-07-19'
updated_at: '2026-07-28'
depends_on:
  - task-333-334-gen3-secret-base-locations-impl
jules_session_id: '13208082478299528661'
pr_number: null
parent: story-324-333-parse-secret-base-locations
tags:
  - feature
  - gen3
  - secret-base
  - qa
research_references: []
rejection_count: 1
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
- [x] Code review passes, ensuring no magic numbers exist and all ADRs are followed.
- [x] Unit tests cover out-of-bounds reads and correct extraction/mapping.

## Notes
- 2026-07-28: Validation failed. The Coder incorrectly assumed Emerald uses 8 bytes for `trainerName` and `0x0A` for the `trainerId` offset. As per `gen3_secret_base_offsets.md`, `TRAINER_NAME_LENGTH` is exactly 7 bytes and `TRAINER_ID_OFFSET` is `0x09` identically across all Gen 3 games. Task has been marked as FAILED to trigger resurrection loop.
