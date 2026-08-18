---
id: task-297-339-gen2-roamer-core-extraction-qa
type: TASK
title: QA Gen 2 Roamer Core Data Extraction
status: COMPLETED
owner_persona: qa
created_at: '2026-07-21'
updated_at: '2026-08-18'
depends_on:
  - task-297-338-gen2-roamer-core-extraction-impl
jules_session_id: null
pr_number: null
parent: story-139-297-gen2-roamer-core-extraction
tags:
  - feature
  - gen2
  - roamer
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 2 Roamer Core Data Extraction

## Context
QA verification for the Gen 2 Roamer Core Data Extraction.

## Verification Requirements
- Verify that `DataView` API is used and `RangeError` exceptions are properly caught and re-thrown with the message: `'The save file is corrupted or incomplete.'` (ADR 010).
- Verify that all memory offsets, lengths, bit locations, and shifts are explicitly defined as reusable constants at the module level. Inline magic numbers are forbidden.
- Verify that roamer data (Raikou, Entei, Suicune) is correctly read based on the `roam_struct`.
- Verify that map tracking variables (`wRoamMons_CurMapGroup`, `wRoamMons_CurMapNumber`) are properly extracted.

## Acceptance Criteria
- [x] Code review passes, ensuring no magic numbers exist and all ADRs are followed.
- [x] Unit tests cover out-of-bounds reads and correct extraction mapping.
