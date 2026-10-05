---
id: task-637-641-vite-jsonl-plugin-impl
type: TASK
title: Implement Vite Plugin Update for JSONL Data
status: COMPLETED
owner_persona: coder
created_at: '2026-09-30'
updated_at: '2026-10-02'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-088-637-vite-jsonl-plugin-update
priority: 50
confidence_score: null
tags:
  - build
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Vite Plugin Update for JSONL Data

## Background
The application now generates `moves.jsonl` and `items.jsonl` containing extracted game data. The Vite build pipeline needs to process and package these files so they can be consumed by the client side.

## Instructions
1. Open `vite-plugins/pokedata-plugin.ts`.
2. Locate the `generateData` function.
3. Check the `exportData` object definition. It already includes `items: items` and `moves: moves`. Verify that `items.jsonl` and `moves.jsonl` are correctly handled and included.
4. If they are already correctly included, ensure everything works as expected. If there are any other missing adjustments to serve them in dev/prod correctly, implement them. `pokedata-core.msgpack` is served and bundled, and it contains the `exportData`. Note that `vite-plugins/pokedata-plugin.ts` includes `*.jsonl` in the `configureServer`'s `server.watcher.add` list, so file watching should be covered.

## Acceptance Criteria
- [x] `vite-plugins/pokedata-plugin.ts` is correctly set up to resolve, bundle, and serve `items.jsonl` and `moves.jsonl` data.
- [x] Tests and build pass successfully.
