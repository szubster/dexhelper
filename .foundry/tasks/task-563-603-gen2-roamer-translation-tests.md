---
id: task-563-603-gen2-roamer-translation-tests
type: TASK
title: Gen 2 Roamer Translation Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-21'
depends_on:
  - task-563-602-gen2-roamer-translation-implementation
jules_session_id: null
pr_number: null
parent: story-140-563-gen2-roamer-translation-logic
tags:
  - gen2
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer Translation Tests

## Objective
Write comprehensive unit tests for the Gen 2 Roamer Translation logic.

## Description
- Write unit tests for the map mapping function using vitest.
- Assert that valid mapGroup and mapId coordinate pairs map to correct human-readable route names.
- Assert that the fallback string 'Unknown Location' is returned when invalid or unmapped coordinates are provided.

## Acceptance Criteria
- [ ] Unit tests cover valid known roamer route maps.
- [ ] Unit tests cover invalid/unknown mapGroup and mapId coordinates and verify fallback logic.
