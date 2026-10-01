---
id: story-399-521-save-state-lru-eviction
type: STORY
title: Implement LRU eviction logic for save states
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-30'
depends_on:
  - story-399-520-save-state-limits
jules_session_id: '10063445709757616147'
pr_number: null
parent: epic-099-399-save-state-lru-eviction-and-limits-retry
tags:
  - storage
  - indexeddb
  - history
rejection_reason: ''
locks: []
---

# Story: Implement LRU eviction logic for save states

## Overview
Implement Least Recently Used (LRU) eviction logic to remove older states when storage limits are reached.

## Acceptance Criteria
- [ ] task-521-638-db-delete-save
- [ ] task-521-639-db-get-oldest-saves
- [ ] task-521-640-lru-eviction-logic
- [ ] task-521-641-lru-eviction-qa
- [x] Break down into Tasks
