---
id: task-524-677-living-dex-ghosts-styling-ui
type: TASK
title: Implement Ghost Rendering and Tactical Styling for Living Dex Grid
status: READY
owner_persona: coder
created_at: '2026-10-09'
updated_at: '2026-10-09'
depends_on:
  - task-524-676-living-dex-ghosts-types
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
locks: []
---

# Task: Implement Ghost Rendering and Tactical Styling for Living Dex Grid

## Context
We need to visually highlight "ghosts" (missing slots) and adhere to the tactical hardware/snooping aesthetic mandated by ADR 008 in the Living Dex Grid.

## Acceptance Criteria
- [ ] Implement the rendering logic to visually highlight missing Pokémon slots as "ghosts" (e.g. using opacity, grayscale, or specific placeholders).
- [ ] Apply tactical styling to the Living Dex Grid components, explicitly using sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`) per ADR 008.
- [ ] Favor using defined `@utility` tactical primitives from `src/index.css` (e.g. `tactical-panel`, `tactical-text`) over raw inline Tailwind classes where applicable.
