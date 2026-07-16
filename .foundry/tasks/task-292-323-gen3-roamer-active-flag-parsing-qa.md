---
id: task-292-323-gen3-roamer-active-flag-parsing-qa
type: TASK
title: Gen 3 Roamer Active Flag Parsing QA
status: ACTIVE
owner_persona: qa
created_at: '2024-05-24'
updated_at: '2026-07-16'
depends_on:
  - task-292-322-gen3-roamer-active-flag-parsing-impl
jules_session_id: '2127676011283524959'
pr_number: null
parent: story-149-292-gen3-roamer-active-flag-parsing
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Active Flag Parsing QA

## Objective
Verify the implementation of extracting the 'active' boolean from the roamer struct for Gen 3 save files.

## Context
The Coder was tasked with parsing the `active` boolean at offset `0x13` of the roamer struct relative to `SaveBlock1` and mapping it to an `isActive` property.

## Verification Requirements
- Verify that the `active` boolean is correctly parsed using the provided offset `0x13`.
- Verify that the resolved section offset (e.g. `section1Offset`) was used to calculate the relative memory offset.
- Verify that the memory offset (`0x13`) is defined as a module-level constant and not inline as a magic number.
- Verify that the resulting state object includes `isActive` correctly mapping the boolean value.
- Write/verify tests testing the extraction of the roamer's active status.

## Acceptance Criteria
- [x] Code passes all verification requirements.
- [x] QA: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [x] QA: If you must abort or permanently fail a task (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [x] QA: If you submit an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.
