---
id: task-551-669-deletion-queue-chunking
type: TASK
title: Deletion Queue Chunking Limit
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-551-668-deletion-queue-types-and-sorting
jules_session_id: null
parent: story-517-551-implement-deletion-chunking
rejection_reason: ''
locks: []
---

# Deletion Queue Chunking Limit

## Description
Implement the chunking logic to limit the deletion queue to a maximum of 50 nodes per execution cycle.

## Acceptance Criteria
- [ ] Ensure the deletion logic processes at most 50 nodes per cycle.
- [ ] Utilize the sorting logic from the previous task to process the oldest first.
