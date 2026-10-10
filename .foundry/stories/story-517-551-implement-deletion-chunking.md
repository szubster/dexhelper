---
id: story-517-551-implement-deletion-chunking
type: STORY
title: Implement Deletion Chunking
status: FAILED
owner_persona: tech_lead
created_at: '2026-09-06'
updated_at: '2026-10-10'
depends_on:
  - story-517-550-implement-node-age-filtering
jules_session_id: null
parent: epic-346-517-archival-cleanup-core-engine
rejection_reason: '[ACKNOWLEDGED] Session terminated with state: NOT_FOUND'
locks: []
---

# Implement Deletion Chunking

## Description
Implement the chunking logic to limit deletions per execution cycle, prioritizing the oldest files.

## Acceptance Criteria
- [ ] Sort eligible nodes to prioritize the oldest files first.
- [ ] Limit the deletion queue to a maximum of 50 nodes per execution cycle.
- [ ] task-551-668-deletion-queue-types-and-sorting
- [ ] task-551-669-deletion-queue-chunking
- [ ] task-551-670-deletion-queue-unit-tests
- [ ] task-551-671-qa-deletion-chunking
