---
id: task-334-353-gen3-mixed-record-trainer-qa
type: TASK
title: QA Gen 3 Mixed Record Trainer Data Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-07-29'
updated_at: '2026-08-01'
depends_on:
  - task-334-352-parse-secret-base-trainer-party-impl
jules_session_id: '16064947660609822773'
pr_number: null
parent: story-324-334-extract-mixed-record-trainer-data
tags:
  - qa
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---
# TASK: QA Gen 3 Mixed Record Trainer Data Extraction

## Objective
Verify the implementation of Gen 3 mixed record trainer data extraction.

## Requirements
1.  Verify that the implementation strictly adheres to Section 13 of `.foundry/docs/schema.md`.
2.  Verify the correctness of offsets and sizes used for extracting trainer name, ID, and party data.
3.  Review the unit tests to ensure they provide adequate coverage for the extraction logic.

## Acceptance Criteria
- [ ] Verification complete.
