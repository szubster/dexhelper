---
id: task-524-668-living-dex-ghosts-ui-qa
type: TASK
title: Verify Highlight Ghosts and Tactical Styling in Living Dex Grid
status: READY
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-524-667-living-dex-ghosts-ui-coder
jules_session_id: null
pr_number: null
parent: story-134-524-living-dex-ghosts-and-styling
tags:
  - feature
  - ui
  - living-dex
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Verify Highlight Ghosts and Tactical Styling in Living Dex Grid

## Context
The Coder has implemented visual highlighting for "ghosts" (missing slots) using `getLivingDexGhosts` from `src/engine/livingDex/ghostTracker.ts` and applied tactical aesthetic styling (ADR 008) to the Living Dex Grid. QA must verify the implementation works correctly and passes tests.

## Acceptance Criteria
- [ ] Verify that missing Pokémon slots ("ghosts") are visually highlighted correctly.
- [ ] Verify that the styling adheres strictly to ADR 008 (`rounded-none`, `border-dashed`, `font-mono`), with `rounded-full` used only for permitted exceptions as per `.foundry/docs/adrs/adr-479-032-adr-008-exceptions.md`.
- [ ] Verify that unit and browser integration tests for `src/components/LivingDexCell.tsx` and `src/components/LivingDexGrid.tsx` pass successfully.
