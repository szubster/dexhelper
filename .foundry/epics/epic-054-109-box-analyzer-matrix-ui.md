---
id: epic-054-109-box-analyzer-matrix-ui
type: EPIC
title: Box Analyzer Comparison Matrix UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-28'
updated_at: '2026-09-06'
depends_on:
  - epic-054-108-box-analyzer-save-parsing
jules_session_id: null
pr_number: null
parent: prd-086-054-box-duplicate-analyzer
tags:
  - feature
  - ui
  - ux
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Box Analyzer Comparison Matrix UI

## Objective
Develop the frontend "Duplicate Analyzer" view within DexHelper, featuring a tabular comparison matrix to display grouped Pokémon species and highlight critical competitive stats.

## Scope
- Create a dedicated view for the Duplicate Analyzer.
- Implement a dense, tabular matrix layout using monospaced fonts (adhering to ADR 024 tactical hardware aesthetic).
- Display required stat columns: Level, Gender, DVs/IVs, Calculated IV Total/Average, Nature, Hidden Power, and Shininess.
- Implement visual highlighting for the "best" stats within a species group (e.g., perfect 31 IVs in green).

## Dependencies
- `epic-054-108-box-analyzer-save-parsing` for the grouped backend data.

## Acceptance Criteria
- [ ] Build the Comparison Matrix UI component.
- [ ] Render all specified stat columns accurately.
- [ ] Implement visual highlighting for optimal stats.
- [ ] Ensure the UI adheres to the established design guidelines (ADR 024).
- [ ] story-109-520-box-analyzer-view-layout
- [ ] story-109-521-box-analyzer-matrix-component
- [ ] story-109-522-box-analyzer-highlighting-logic
- [ ] story-109-523-box-analyzer-matrix-e2e
