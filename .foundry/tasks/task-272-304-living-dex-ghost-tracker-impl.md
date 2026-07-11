---
id: task-272-304-living-dex-ghost-tracker-impl
type: TASK
title: Living Dex Ghost Tracker Impl
status: READY
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-133-272-living-dex-ghost-tracker
tags:
  - feature
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Living Dex Ghost Tracker Impl

## Context
As part of the Living Dex Tracker epic, we need a data engine utility to determine which Pokémon are missing from the regional/national Pokédex (the "ghosts"). This data will power the Living Dex Tracker UI.

## Acceptance Criteria
- [ ] Create a new module `src/engine/livingDex/ghostTracker.ts`.
- [ ] Implement and export a function `getLivingDexGhosts(saveData: SaveData, regionalOnly: boolean = false): number[]`.
- [ ] The function must evaluate `saveData.pc` and `saveData.party` to build an exact physical owned set. (Note: do not rely solely on `saveData.owned`, as a Living Dex requires physical copies, not just Pokédex seen/caught flags).
- [ ] Iterate through `1` to `maxDex` (retrieved via `getGenerationConfig(saveData.generation)`) to output the missing IDs.
- [ ] If `regionalOnly` is `true`, filter the output or adjust the loop based on the regional dex bounds for the game version (e.g. 151 for Gen 1, 251 for Gen 2, etc. Gen 3 Hoenn dex is 202, you will need to map Hoenn numbers to National numbers or just support National for now if regional is complex, but attempt to support regional bounds). Actually, simpler: for MVP, default to National (`maxDex`), and if `regionalOnly` is provided, handle it based on the available data or throw a NotImplemented error for regional logic if mapping is unavailable yet.
- [ ] Write unit tests for this utility using vitest in `src/engine/livingDex/ghostTracker.test.ts`.

## Constraints & Architecture
- **No Side Effects**: The function must be pure and synchronous.
- **Failures & Aborts**:
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
  - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
