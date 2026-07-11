---
id: task-258-263-egg-move-precomputation-etl-impl
type: TASK
title: Implement Egg Move Precomputation in ETL
status: READY
owner_persona: coder
created_at: '2026-07-03'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-113-258-egg-move-pathfinding-core
tags:
  - feature
  - mechanics
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Egg Move Precomputation in ETL

## Overview
Implement the Breadth-First Search (BFS) algorithm to precompute the shortest breeding chains for passing Egg Moves in `scripts/generate-pokedata.ts`. The algorithm should find paths from species that learn the move natively to the target species. The resulting data should be added to the precomputed static database.

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement BFS pathfinding algorithm in `scripts/generate-pokedata.ts` for Egg Moves.
- [ ] Calculate the shortest breeding chain for all valid (Target Species, Egg Move) combinations.
- [ ] Save the precomputed paths in the exported static data (e.g. `pokemon.jsonl` or a new `egg_moves.jsonl`).
- [ ] Ensure proper testing and verification are done.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
