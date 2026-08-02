---
id: prd-101-106-pc-box-organization-assistant
type: PRD
title: Gen 1-3 PC Box Organization Assistant
status: READY
owner_persona: epic_planner
created_at: '2026-07-04'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-101-pc-box-organization-assistant
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 1-3 PC Box Organization Assistant

## Objective
Provide an intelligent, side-by-side guided sorting tool for Generation 1, 2, and 3 games that calculates an optimal PC Box layout and generates a step-by-step "move plan" checklist for the user to execute manually.

## Features
1.  **Dual-Pane View:** A UI displaying the current save state's PC boxes next to the proposed optimal layout.
2.  **Sorting Strategies:** Allow users to choose sorting algorithms (e.g., National Dex order, Type, Level).
3.  **Diff Engine & Move Planner:** A background process that compares the current layout to the target layout and generates a minimal set of manual move operations.
4.  **Interactive Checklist:** A step-by-step checklist of operations (e.g., "Move Pikachu from Box 1 to Box 5").

## Acceptance Criteria
- [x] Break down this PRD into distinct Epics covering UI, diff engine logic, and sorting algorithms.
- [ ] epic-106-136-pc-box-sorting-algorithms
- [ ] epic-106-137-pc-box-diff-engine-move-planner
- [ ] epic-106-138-pc-box-organization-ui
