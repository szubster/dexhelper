---
id: task-401-409-gen2-dv-extraction-impl
type: TASK
title: Gen 2 DV Extraction Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-11'
depends_on:
  - task-401-408-gen2-dv-extraction-types
jules_session_id: null
pr_number: null
parent: story-112-401-gen2-dv-extraction
tags:
  - dexhelper
  - generation-2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 DV Extraction Implementation

## Overview
Implement the logic to extract Gen 2 DVs (Attack, Defense, Speed, and Special) from the save file.

## Technical Requirements
- Implement the extraction parsing logic for Gen 2 DVs.
- You must catch `RangeError` from out-of-bounds reads using `DataView` and throw a new error with the exact message: `'The save file is corrupted or incomplete.'`

## Acceptance Criteria
- [x] Implement Gen 2 DV extraction logic.
- [x] Ensure that `RangeError` is caught during extraction, throwing a new error with the message `'The save file is corrupted or incomplete.'`.
