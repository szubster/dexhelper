---
id: task-521-618-box-analyzer-matrix-component
type: TASK
title: Box Analyzer Matrix Component UI
status: PENDING
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-09-24'
depends_on:
  - task-521-617-box-analyzer-matrix-types
jules_session_id: null
pr_number: null
parent: story-109-521-box-analyzer-matrix-component
tags:
  - feature
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Box Analyzer Matrix Component UI

## Objective
Implement the tabular matrix component to display grouped Pokémon species and their stats, adhering strictly to ADR 024.

## Context
This builds the core visual component that will display the structured Box Analyzer data to the user.

## Acceptance Criteria
- [ ] Implement the tabular data grid component for the Box Analyzer.
- [ ] Render columns for Level, Gender, DVs/IVs, Calculated IV Total/Average, Nature, Hidden Power, and Shininess.
- [ ] Bind data correctly utilizing the types defined in the prerequisite task.
- [ ] Adhere to ADR 024 aesthetic rules (sharp edges, dashed borders, monospaced fonts, tactical-utilities).
- [ ] Write unit tests ensuring component renders correctly.
