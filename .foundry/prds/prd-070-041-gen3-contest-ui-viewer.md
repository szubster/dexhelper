---
id: prd-070-041-gen3-contest-ui-viewer
type: PRD
title: Gen 3 Contest Condition and Ribbon Viewer UI
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-06-08'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '3197885195207899979'
pr_number: null
parent: idea-070-gen3-contest-tracker
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 3 Contest Condition and Ribbon Viewer UI

## 1. Context
Following the data extraction phase, DexHelper must present the extracted Gen 3 Contest statistics (Condition and Sheen) and Ribbons to the user. The current in-game representations are vague (e.g., pentagon graphs without numeric values) and checking ribbons across hundreds of Pokémon is tedious. This UI aims to provide clear, tabular, and actionable views of this data.

## 2. Requirements

### 2.1 Contest Stats Viewer
- **Numerical Display**: Replace the vague in-game visual representation with exact numerical values for Cool, Beauty, Cute, Smart, and Tough.
- **Sheen Display**: Clearly show the current Sheen value alongside its maximum limit (255) to indicate how many more Pokéblocks a Pokémon can consume.
- **Integration**: This viewer must be integrated into the detailed view of individual Pokémon.

### 2.2 Ribbon Checklist
- **Aggregate View**: Create a centralized dashboard or checklist view that aggregates Contest Ribbon data across the entire Living Dex (or current PC boxes).
- **Master Rank Tracking**: Highlight Pokémon that have achieved Master Rank in specific contest categories.
- **Missing Ribbons**: Provide a clear indication of which Pokémon are missing which Ribbons to aid completionists.

### 2.3 UI Components & Styling
- Adhere to existing design system components (`TacticalButton`, `TacticalMultiSelectControl`, etc.) where applicable.
- Ensure the UI is responsive and accessible, handling large datasets (entire PC) gracefully.

## 3. Acceptance Criteria
- [ ] Implement a detailed view component displaying numerical Contest stats and Sheen for a single Pokémon.
- [ ] Implement a global Ribbon Checklist view aggregating data across all stored Pokémon.
- [ ] Provide filtering/sorting options in the Ribbon Checklist (e.g., sort by missing Ribbons, filter by category).
- [ ] Ensure rendering performance is maintained when viewing hundreds of Pokémon in the checklist.
- [ ] Pass visual regression and accessibility checks.

## Generated Epics
- [x] .foundry/archive/epics/epic-041-064-contest-ui-shared-components.md
- [x] .foundry/archive/epics/epic-041-065-individual-contest-stats-view.md
- [x] .foundry/epics/epic-041-066-global-ribbon-checklist-dashboard.md
- [x] .foundry/epics/epic-041-091-visual-regression-accessibility.md
