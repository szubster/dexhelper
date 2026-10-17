---
id: story-517-551-implement-deletion-chunking
type: STORY
title: Implement Deletion Chunking
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-06'
updated_at: '2026-10-15'
depends_on:
  - story-517-550-implement-node-age-filtering
jules_session_id: null
parent: epic-346-517-archival-cleanup-core-engine
rejection_count: 1
rejection_reason: ''
locks: []
---

# Implement Deletion Chunking

## Description
Implement the chunking logic to limit deletions per execution cycle, prioritizing the oldest files.

## Acceptance Criteria
- [x] Sort eligible nodes to prioritize the oldest files first.
- [x] Limit the deletion queue to a maximum of 50 nodes per execution cycle.
- [x] task-551-668-deletion-queue-types-and-sorting
- [x] task-551-669-deletion-queue-chunking
- [x] task-551-670-deletion-queue-unit-tests
- [x] task-551-671-qa-deletion-chunking
