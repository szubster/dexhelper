---
id: task-402-649-002-refactor-pokemon-details
type: TASK
title: Apply Lazy Loading to Pokemon Details UI
status: PENDING
owner_persona: coder
created_at: '2026-10-18T00:21:26Z'
updated_at: '2026-10-20'
depends_on:
  - task-402-649-001-lazy-loading-wrapper
jules_session_id: null
pr_number: null
parent: story-402-649-refactor-ui-lazy-loading
tags:
  - ui
  - performance
  - lazy-loading
  - react
research_references: []
rejection_reason: ''
locks: []
---

# Task: Apply Lazy Loading to Pokemon Details UI

## Description
Refactor the UI components within `PokemonDetails.tsx` and `PokemonCaughtDetails.tsx` to utilize the new `LazyLoadWrapper` instead of inline `<React.Suspense>` blocks.

## Requirements
- Replace inline `<React.Suspense>` implementations in `PokemonDetails.tsx` and `PokemonCaughtDetails.tsx` with `LazyLoadWrapper`.
- Ensure fallbacks are properly sized for the respective content blocks.

## Acceptance Criteria
- [ ] Replace `React.Suspense` blocks in `src/components/PokemonDetails.tsx`.
- [ ] Replace `React.Suspense` blocks in `src/components/pokemon/details/PokemonCaughtDetails.tsx`.
- [ ] Verify that UI does not flash or block during loading.
