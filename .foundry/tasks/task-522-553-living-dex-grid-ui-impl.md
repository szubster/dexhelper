---
id: task-522-553-living-dex-grid-ui-impl
type: TASK
title: Implement Living Dex Grid UI Components
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-134-522-living-dex-numerical-grid
tags:
  - ui
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Living Dex Grid UI Components

## Context
As part of the Living Dex Grid UI Epic, we need to implement the visual components for the numerical grid view of all Pokémon in the Pokédex.

## Acceptance Criteria
- [ ] Create a LivingDexGrid component and a LivingDexCell component.
- [ ] The grid must render exactly 386 cells (up to Gen 3 NATIONAL_DEX_MAX).
- [ ] Each cell must display the Pokémon's national dex number.
- [ ] The components must be structured to accept state overlays (PC box / Party state) via props.
- [ ] Adhere to the tactical hardware aesthetic (ADR 008): explicitly use sharp edges (rounded-none), dashed borders (border-dashed), and monospaced telemetry fonts (font-mono). Do not use any rounded corners.
- [ ] Component integration: The component must be integrated into the application's view hierarchy.
