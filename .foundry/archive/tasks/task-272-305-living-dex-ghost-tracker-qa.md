---
id: task-272-305-living-dex-ghost-tracker-qa
type: TASK
title: Living Dex Ghost Tracker QA
status: COMPLETED
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-13'
depends_on:
  - task-272-304-living-dex-ghost-tracker-impl
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

# Task: Living Dex Ghost Tracker QA

## Context
The Coder has implemented a data engine utility to determine which Pokémon are missing from the regional/national Pokédex (the "ghosts"). This data will power the Living Dex Tracker UI.

## Acceptance Criteria
- [x] Verify the existence of the new module `src/engine/livingDex/ghostTracker.ts` and its test file `src/engine/livingDex/ghostTracker.test.ts`.
- [x] Verify that `getLivingDexGhosts(saveData: SaveData, regionalOnly: boolean = false): number[]` correctly calculates missing Living Dex ghosts by evaluating `saveData.pc` and `saveData.party` rather than just `saveData.owned` flags.
- [x] Verify that the generated tests pass (`pnpm test`) and cover both base logic and any `regionalOnly` fallback/implementation behavior.

## Constraints & Architecture
- **Failures & Aborts**:
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
  - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
