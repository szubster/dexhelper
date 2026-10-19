---
id: story-333-676-fame-checker-dashboard-components
type: STORY
title: Fame Checker Dashboard Components
status: READY
owner_persona: tech_lead
created_at: '2026-10-15T19:32:39.601Z'
updated_at: '2026-10-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-115-333-gen3-fame-checker-dashboard-ui
tags:
  - gen3
  - fame-checker
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Fame Checker Dashboard Components

## Context
To visualize the Fame Checker data from FireRed and LeafGreen, we need a set of React components. These components will render the data in a dashboard following the "tactical hardware/snooping" aesthetic guidelines (sharp edges, monospaced fonts, etc.).

## Objectives
- Implement presentational components to display NPCs and their respective Fame Checker entries.
- Ensure the components differentiate between unlocked entries and missing entries (providing hints for missing ones).
- Apply Tailwind v4 primitives and `src/index.css` utility classes to match the application's design system.

## Scope
- Create the core UI components (e.g., `FameCheckerDashboard`, `NPCList`, `FameCheckerEntryList`).
- Provide mock data structures to render these components in isolation.

## Acceptance Criteria
- [ ] task-676-710-fame-checker-base-ui
- [ ] task-676-711-qa-fame-checker-base-ui
- [ ] task-676-712-fame-checker-dashboard
- [ ] task-676-713-qa-fame-checker-dashboard
- [ ] Components are built and adhere to the tactical hardware aesthetic.
