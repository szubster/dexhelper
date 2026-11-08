---
id: task-677-746-gen3-trainer-card-tactical-ui-impl
type: TASK
title: Task - Implement Gen 3 Trainer Card Tactical UI
status: READY
owner_persona: coder
created_at: '2026-11-08'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-401-677-gen3-trainer-card-tactical-components
tags:
  - react
  - ui
  - gen3
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 3 Trainer Card Tactical UI

## Description
Implement the visual Trainer Card layout in the main Gen 3 dashboard. Adhere to ADR 008 (tactical hardware UI style), leveraging `@utility` tactical primitives from `src/index.css` with sharp edges (e.g., `rounded-none`, `border-dashed`, monospaced fonts). The Trainer Card must display the current number of earned stars prominently, integrating with the core state layer.

## Acceptance Criteria
- [ ] Create or update the Trainer Card component to use tactical UI layout and `@utility` primitives with sharp edges.
- [ ] Fetch the core state to display the current number of earned stars prominently.
- [ ] Add unit/integration tests verifying the visual layout and earned stars rendering.
