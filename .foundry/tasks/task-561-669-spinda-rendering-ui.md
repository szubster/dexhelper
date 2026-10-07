---
id: task-561-669-spinda-rendering-ui
type: TASK
title: Spinda UI Presentation Component
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-561-668-spinda-rendering-types
jules_session_id: null
pr_number: null
parent: story-346-561-spinda-pattern-rendering-component
tags:
  - gen3
  - spinda
  - ui
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Spinda UI Presentation Component

## Description
Implement the purely presentational React component (`SpindaRenderer`) that takes the defined props and visually overlays the 4 spots onto the base Spinda sprite.

## Requirements
- Create the React component utilizing the types defined in the previous task.
- Accurately overlay the 4 spots onto the base sprite using layered elements (Canvas or SVG).
- Apply Tactical UI styling guidelines (e.g., sharp edges via `rounded-none`, dashed borders, monospaced fonts if any text is displayed) per ADR 008.
- Ensure the component is modular and reusable.

## Acceptance Criteria
- [ ] Component renders the base Spinda sprite.
- [ ] Component precisely overlays 4 spots at the provided coordinates.
- [ ] Component strictly adheres to Tactical UI guidelines.
