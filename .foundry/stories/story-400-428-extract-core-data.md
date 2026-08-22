---
id: story-400-428-extract-core-data
type: STORY
title: Extract Core Data
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-17'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-337-400-data-splitting
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Extract Core Data

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
This story covers the extraction of core data (shared data like basic Pokemon list, moves, items) into `pokedata-core.msgpack`.

## Acceptance Criteria
- [ ] Task to refactor generation scripts to output `pokedata-core.msgpack`
- [ ] Task to update data loading logic to fetch `pokedata-core.msgpack` initially
- [ ] task-428-436-refactor-core-data-generation
- [ ] task-428-437-update-data-loading-logic
- [ ] task-428-438-extract-core-data-qa
