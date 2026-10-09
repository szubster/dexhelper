---
id: task-551-671-qa-deletion-chunking
type: TASK
title: QA Deletion Chunking
status: READY
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-551-670-deletion-queue-unit-tests
jules_session_id: null
parent: story-517-551-implement-deletion-chunking
rejection_reason: ''
locks: []
---

# QA Deletion Chunking

## Description
Verify the correctness of the deletion chunking and sorting logic.

## Acceptance Criteria
- [ ] QA verifies that the deletion queue properly sorts eligible nodes to prioritize the oldest files first.
- [ ] QA verifies that the deletion queue is limited to a maximum of 50 nodes per execution cycle.
