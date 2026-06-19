---
id: task-134-187-session-id-validator-impl
type: TASK
title: Implement Session ID Extraction and Validation
status: ACTIVE
owner_persona: coder
created_at: '2026-06-15'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: '12037739669043454067'
pr_number: null
parent: story-089-134-session-id-validator
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Session ID Extraction and Validation

## 1. Context
As part of the Zombie Node Detection Engine (Epic 050), we need to extract and strictly validate the `jules_session_id` associated with each `ACTIVE` node to verify if the session is legitimate or malfunctioning. Currently, there may be missing or weak validation.

## 2. Requirements
- Write robust logic to extract the `jules_session_id` from the parsed frontmatter of `ACTIVE` nodes.
- Implement explicit validation checks to see if `jules_session_id` is null, empty, or malformed (e.g., does not match the expected session ID format, if there is one).
- Ensure that nodes lacking a valid session ID while in the `ACTIVE` state indicate an immediate integrity error and are transitioned appropriately (e.g., to `FAILED`).
- Remember: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Implement robust extraction logic for `jules_session_id`.
- [ ] Implement format and existence validation for the extracted ID.
- [ ] Create or update tests handling cases with valid, null, missing, or malformed session IDs.
