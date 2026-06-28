---
id: research-044-207-gen3-roamer-ui-alternatives
type: RESEARCH
title: Gen 3 Roamer Alternative UI Research
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-20'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: '7296602212498859565'
pr_number: null
parent: prd-071-044-gen3-roamer-tracker
tags:
  - gen3
  - roamer
  - ui
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Alternative UI Research

## Objective
Investigate and define UI alternatives for the Gen 3 Roamer Dashboard now that precise map location extraction (the Route Radar) has been proven impossible (ADR 108-027).

## Context
The original UI design required a Route Radar map component. Since we cannot extract the exact map location from EWRAM, we need to design alternative visualizations that still provide value. Possible options include highlighting general region availability or focusing entirely on the detailed IV and Status breakdown.

## Acceptance Criteria
- [x] Determine the most valuable way to display roamer state without a Route Radar.
- [x] Update the UI specification for the new Dashboard component.

## Research Findings

Based on ADR 108-027, the Gen 3 roamer's exact map location is kept in dynamically allocated EWRAM during gameplay and is not serialized into the save file. This makes static extraction of the map coordinates impossible.

As an alternative, the UI should pivot to a data-heavy "Roamer Dossier" format, focusing on the following information extracted from the `Roamer` struct and event flags:
- **Active Status Indicator:** Leveraging the `active` boolean in the `Roamer` struct (offset `0x13`).
- **Internal Stats Breakdown:** Extracting Level, HP, Status, and IVs.
- **Roamer IV Glitch Warning:** Explicitly displaying a warning if the Pokémon is affected by the Gen 3 Roamer IV Glitch.

All UI components must adhere strictly to the tactical hardware aesthetic constraints outlined in ADR 008 (`border-dashed`, `rounded-none`, `font-mono`).

The detailed UI specification can be found here: `.foundry/docs/knowledge_base/ui/gen3_roamer_dashboard_spec.md`.
