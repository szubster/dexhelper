---
id: task-551-670-deletion-queue-unit-tests
type: TASK
title: Deletion Queue Unit Tests
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on:
  - task-551-669-deletion-queue-chunking
jules_session_id: null
parent: story-517-551-implement-deletion-chunking
rejection_reason: ''
locks: []
---

# Deletion Queue Unit Tests

## Description
Implement unit tests for the deletion queue sorting and chunking logic.

## Acceptance Criteria
- [ ] Write unit tests verifying that older nodes are prioritized in the deletion queue.
- [ ] Write unit tests verifying the 50-node chunking limit.
