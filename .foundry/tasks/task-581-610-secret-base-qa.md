---
id: task-581-610-secret-base-qa
type: TASK
title: Secret Base Extraction QA
status: PENDING
owner_persona: qa
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on:
  - task-581-609-secret-base-extraction-logic
jules_session_id: null
pr_number: null
parent: story-569-581-gen3-secret-base-array-extraction
tags:
  - dexhelper
  - gen3
  - secret-base
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Secret Base Extraction QA

## Context
We need to QA verify the Gen 3 Secret Base Array Extraction implementation.

## Requirements
- Verify that the SecretBase array is safely extracted from SaveBlock1.
- Verify that the DataView API is used and relative offsets (based on section1Offset/section2Offset) are correctly applied for A/B bank support.
- Ensure that explicit module-level constants are used and no magic numbers exist in the extraction logic.
- Verify that unit tests pass and cover edge cases (e.g., catching RangeError).

## Acceptance Criteria
- [ ] Perform QA verification of the extraction logic.
- [ ] Approve or reject the implementation.
