---
id: story-064-102-contest-sheen-display-ui
type: STORY
title: Contest Sheen Display UI Component
status: READY
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-041-064-contest-ui-shared-components
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

# Story: Contest Sheen Display UI Component

## 1. Context
Derived from `epic-041-064-contest-ui-shared-components`, this story focuses on creating the reusable UI component to visualize a Pokémon's Sheen value.

## 2. Requirements
- The component must accept a numerical Sheen value between 0 and 255.
- It must visually represent this value relative to the maximum of 255 (e.g., as a progress bar or radial meter).
- The styling must match the tactical hardware aesthetic of the application.
- It should visually indicate when the Sheen is maxed out.

## 3. Acceptance Criteria
- [ ] Implement the `ContestSheenDisplay` React component.
- [ ] Add rendering tests to verify empty, partial, and full sheen displays.
- [ ] Ensure proper styling matching the project's aesthetics.

## Tasks
- [ ] .foundry/tasks/task-102-157-contest-sheen-display-impl.md
- [ ] .foundry/tasks/task-102-158-contest-sheen-display-qa.md
