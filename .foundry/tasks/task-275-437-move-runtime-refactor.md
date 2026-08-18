---
id: task-275-437-move-runtime-refactor
type: TASK
title: Refactor Runtime to use Dynamic Move Data
status: ACTIVE
owner_persona: coder
created_at: '2026-08-17'
updated_at: '2026-08-18'
depends_on:
  - task-275-436-move-db-schema-qa
jules_session_id: '13209909812101684464'
pr_number: null
parent: story-086-275-move-runtime-integration
tags:
  - refactor
  - runtime
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Refactor Runtime to use Dynamic Move Data

## Background
With `moves` data now available dynamically in PokeDB, we need to replace the old hardcoded tables.

## Goals
1. Remove manual/hardcoded tables for move data.
2. Update the client runtime to fetch and utilize the dynamic PokeDB move data for accurate PP limit calculations.

## Acceptance Criteria
- [ ] Hardcoded move tables are removed.
- [ ] Runtime switches to utilize dynamic PokeDB move data.
