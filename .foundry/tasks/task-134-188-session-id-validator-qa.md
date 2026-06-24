---
id: task-134-188-session-id-validator-qa
type: TASK
title: QA Session ID Extraction and Validation
status: READY
owner_persona: qa
created_at: '2026-06-15'
updated_at: '2026-06-22'
depends_on: []jules_session_id: null
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

# Task: QA Session ID Extraction and Validation

## 1. Context
The implementation for extracting and validating the `jules_session_id` in `ACTIVE` nodes has been completed. The QA persona needs to verify this logic correctly detects null, empty, and malformed session IDs.

## 2. Requirements
- Verify that the logic successfully extracts `jules_session_id`.
- Ensure tests comprehensively cover all invalid cases (null, missing, empty, malformed format).
- Verify that an invalid session ID for an `ACTIVE` node correctly flags an integrity error.
- Remember: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Verify extraction logic covers edge cases.
- [ ] Verify validation catches malformed or missing IDs.
- [ ] Review implementation tests for completeness.
