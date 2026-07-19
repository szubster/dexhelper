---
id: task-258-265-suggestion-engine-egg-moves-impl
type: TASK
title: Update Suggestion Engine for Egg Move Pathfinding
status: READY
owner_persona: coder
created_at: '2026-07-03'
updated_at: '2026-07-19'
depends_on:
  - task-258-264-egg-move-precomputation-etl-qa
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

# Task: Update Suggestion Engine for Egg Move Pathfinding

## Overview
Update `src/engine/assistant/suggestionEngine.ts` to utilize the newly precomputed Egg Move breeding chains. Perform O(1) lookups on the static data and surface the next actionable breeding step based on the player's current save file (PC/Party data).

## Workflow Reminders
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Update `suggestionEngine.ts` to query the precomputed Egg Move paths.
- [ ] Suggest the next breeding step if the player owns a Pokémon in the chain.
- [ ] Ensure the UI surfaces these suggestions correctly to the user.
- [ ] Ensure proper testing and verification are done.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
