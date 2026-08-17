---
id: task-275-435-move-db-schema-inflation
type: TASK
title: Move Data DB Schema and Inflation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-17'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '9330737274448347349'
pr_number: null
parent: story-086-275-move-runtime-integration
tags:
  - refactor
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Move Data DB Schema and Inflation

## Background
The `moves.jsonl` data has been generated. We need to integrate this dataset into the client IndexedDB schema and ensure its omitted default values are inflated.

## Goals
1. Integrate the `moves.jsonl` data into `src/db/schema.ts` and `src/db/PokeDB.ts`.
2. Implement inflation logic in the client runtime.

## Acceptance Criteria
- [ ] Integrate `moves` dataset into database schema and sync.
- [ ] Implement inflation logic for move data.
