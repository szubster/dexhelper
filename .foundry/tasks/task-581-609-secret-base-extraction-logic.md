---
id: task-581-609-secret-base-extraction-logic
type: TASK
title: Secret Base Extraction Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on:
  - task-581-608-secret-base-constants
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

# Task: Secret Base Extraction Logic

## Context
As part of the Gen 3 Secret Base Array Extraction, we need to implement the actual extraction logic using the DataView API.

## Requirements
- Implement the parsing engine logic to extract the SecretBase array from Gen 3 SaveBlock1.
- Use the DataView API.
- Use relative offsets based on the resolved section offset (e.g. section1Offset or section2Offset) to support A/B bank flash memory architecture (ADR 010).
- Utilize the module-level constants defined in the previous task.
- Ensure RangeError is caught during extraction as per Section 13 guidelines in schema.md.
- Write unit tests covering the extraction logic.

## Acceptance Criteria
- [ ] Implement extraction logic using DataView and relative offsets.
- [ ] Write unit tests for the extraction logic.
