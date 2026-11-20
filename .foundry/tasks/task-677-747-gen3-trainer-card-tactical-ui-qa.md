---
id: task-677-747-gen3-trainer-card-tactical-ui-qa
type: TASK
title: Task - QA Gen 3 Trainer Card Tactical UI
status: READY
owner_persona: qa
created_at: '2026-11-08'
updated_at: '2026-11-08'
depends_on:
  - task-677-746-gen3-trainer-card-tactical-ui-impl
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

# Task: QA Gen 3 Trainer Card Tactical UI

## Description
Verify the implementation of the Gen 3 Trainer Card tactical UI components. Ensure strict adherence to the tactical hardware aesthetic guidelines (ADR 008, `@utility` usage, sharp edges, no rounded corners except full, monospaced font). Confirm the component correctly displays the number of earned stars from the core state.

## Acceptance Criteria
- [ ] Verify the Trainer Card component adheres to tactical UI layout and `@utility` primitives with sharp edges.
- [ ] Verify the current number of earned stars is displayed prominently.
- [ ] Verify the component integrates correctly with the core state layer.
- [ ] Verify tests pass and cover the core presentation logic.
