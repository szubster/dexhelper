---
id: task-436-455-state-variables-extraction-qa
type: TASK
title: QA State Variables Extraction
status: PENDING
owner_persona: qa
created_at: '2026-08-21'
updated_at: '2026-08-21'
depends_on:
  - task-436-454-state-variables-extraction-impl
jules_session_id: null
pr_number: null
parent: story-424-436-save-block-mapping
tags:
  - emulator
  - memory
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA State Variables Extraction

## Objective
QA the state variables extraction logic.

## Description
Review the implementation of Gen 3 game state variables and bank offset extraction. Verify that the coder strictly adhered to Section 13 of `.foundry/docs/schema.md` by using relative offsets instead of absolute hardcoded offsets. Ensure that all memory offsets and calculation limits are defined as reusable module-level constants and that no magic numbers are present within parsing functions. Verify the presence of passing unit tests.

## Acceptance Criteria
- [x] Verified relative offsets are used instead of absolute ones
- [x] Verified no magic numbers are present in the extraction logic
