---
id: epic-099-399-save-state-lru-eviction-and-limits-retry
type: EPIC
title: Save State Storage Limits and LRU Eviction (Retry)
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-11-05'
depends_on:
  - epic-099-398-save-state-read-write-api-retry
jules_session_id: null
pr_number: null
parent: prd-066-099-save-state-history-storage
tags:
  - storage
  - indexeddb
  - history
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Save State Storage Limits and LRU Eviction (Retry)

## Overview
Implement mechanisms to handle storage limits gracefully, including maximum number of states per playthrough and LRU eviction if necessary. This is a retry of the cancelled epic-099-132-save-state-lru-eviction-and-limits.

## Acceptance Criteria
- [x] Define and implement the maximum number of save states allowed per playthrough.
- [x] Implement LRU (Least Recently Used) eviction logic to remove older states when limits are reached.
- [x] Ensure the storage engine handles quota exceeded errors gracefully.
- [x] Create a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-399-520-save-state-limits
- [x] story-399-521-save-state-lru-eviction
- [x] story-399-522-save-state-quota-handling
- [x] story-399-523-save-state-limits-e2e
