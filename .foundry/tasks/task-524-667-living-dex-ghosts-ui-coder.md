---
id: task-524-667-living-dex-ghosts-ui-coder
type: TASK
title: Highlight Ghosts and Apply Tactical Styling to Living Dex Grid (Implementation)
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-134-524-living-dex-ghosts-and-styling
tags:
  - feature
  - ui
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Highlight Ghosts and Apply Tactical Styling to Living Dex Grid

## Context
As part of the Living Dex Grid, missing slots ("ghosts") must be visually highlighted. Additionally, the grid must adhere to the tactical hardware aesthetic mandated by ADR 008, specifically using sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Exception to ADR 008 allows `rounded-full` only for specific items like radar/sonar pings, reticles, or small LED indicators as per `.foundry/docs/adrs/adr-479-032-adr-008-exceptions.md`.

## Acceptance Criteria
- [ ] Implement visual highlighting for missing Pokémon slots ("ghosts") using `getLivingDexGhosts` from `src/engine/livingDex/ghostTracker.ts` in `src/components/LivingDexCell.tsx` and `src/components/LivingDexGrid.tsx`.
- [ ] Apply `rounded-none`, `border-dashed`, and `font-mono` styles to ensure ADR 008 compliance.
- [ ] Add unit and browser integration tests using `vitest-browser-react` to verify the styles and ghost logic.
