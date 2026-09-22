---
id: task-581-608-secret-base-constants
type: TASK
title: Secret Base Extraction Constants
status: READY
owner_persona: coder
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on: []
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

# Task: Secret Base Extraction Constants

## Context
As part of the Gen 3 Secret Base Array Extraction, we need to define explicit module-level constants for all lengths and offsets.

## Requirements
- Identify and define module-level constants for all lengths, offsets, and array bounds related to Gen 3 Secret Base extraction from SaveBlock1.
- Ensure no magic numbers are used in the extraction logic.
- Include unit tests verifying constant values against expected specifications.

## Acceptance Criteria
- [ ] Implement module-level constants.
- [ ] Add unit tests for constant integrity.
