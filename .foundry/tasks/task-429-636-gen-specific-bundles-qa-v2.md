---
id: task-429-636-gen-specific-bundles-qa-v2
type: TASK
title: QA Gen-Specific Bundles and Lazy Loading (v2)
status: READY
owner_persona: qa
created_at: '2026-09-28'
updated_at: '2026-09-28'
depends_on:
  - task-429-635-implement-lazy-fetching-v2
jules_session_id: null
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - qa
  - performance
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: QA Gen-Specific Bundles and Lazy Loading (v2)

## Context
We have implemented generation-specific bundles (`pokedata-gen{N}.msgpack`) and lazy loading to improve performance (ADR 029).

## Description
This QA task replaces the cancelled `task-429-475-gen-specific-bundles-qa`. Verify that the generation scripts correctly output the gen-specific bundles, the Vite plugin serves them correctly, and the `PokeDB` lazy loading mechanism successfully fetches and syncs the data when required.

## Acceptance Criteria
- [ ] Verify that building the data generates `pokedata-core.msgpack` and the `pokedata-gen{N}.msgpack` bundles.
- [ ] Verify using E2E or integration tests that the gen-specific bundles are fetched and synced upon save file load.
- [ ] Verify that UI components depending on gen-specific data still function correctly after the split.
