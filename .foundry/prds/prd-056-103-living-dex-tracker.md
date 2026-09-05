---
id: prd-056-103-living-dex-tracker
type: PRD
title: Specialized "Living Dex" Organization Tracker UI
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-03'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-056-living-dex-tracker
tags:
  - feature
  - ui
  - living-dex
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Specialized "Living Dex" Organization Tracker UI

## 1. Context & Motivation
Players of early Pokémon games (Gen 1 and Gen 2, and soon Gen 3) frequently aim to assemble a "Living Dex" — exactly one of every Pokémon stored in numerical order in their PC boxes. Organizing PC boxes manually in these games is extremely tedious without automated sorting. DexHelper currently acts as a premium storage viewer but lacks a dedicated Living Dex organization tool.

## 2. Product Requirements
We need a dedicated "Living Dex Tracker" view in the DexHelper UI.

- **Numerical Grid View**: Display a unified grid of all Pokémon in the regional or national Pokédex in numerical order.
- **PC Box and Slot Overlay**: Visually overlay the player's current PC box and Party state onto this grid. Crucially, show exactly which PC Box and Slot the currently owned Pokémon resides in.
- **Ghost Highlighting**: Highlight "ghosts" (missing Pokémon slots).
- **Evolution Path Highlighting**: Highlight "duplicates" or "evolution paths" indicating raw material available to fill missing slots (e.g., if you have 3 Bulbasaurs but no Ivysaur, it highlights that a Bulbasaur can be evolved).

## 3. Scope & Constraints
- Must align with the tactical hardware/snooping aesthetic (ADR 008, `rounded-none`, `border-dashed`, monospaced fonts).
- Toggleable or accessible from the main DexHelper storage view.

## 4. Acceptance Criteria
- [x] Epic Planner: Break down this PRD into manageable Epics.
- [ ] epic-103-133-living-dex-data-engine
- [ ] epic-103-134-living-dex-grid-ui
- [ ] epic-103-135-living-dex-evolution-highlighting
