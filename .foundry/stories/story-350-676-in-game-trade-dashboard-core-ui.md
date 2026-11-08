---
id: story-350-676-in-game-trade-dashboard-core-ui
type: STORY
title: In-Game Trade Dashboard Core UI
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-17'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-056-350-in-game-trade-dashboard-ui-v2
tags:
  - feature
  - ui
  - ux
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Story: In-Game Trade Dashboard Core UI

## Objective
Build the core layout and component for the In-Game Trade Dashboard, listing NPC trades and their completion status.

## Scope
- Create a new route/dashboard view for NPC trades.
- Implement the UI component to list all NPC trades for the detected game version.
- Add visual tags ("Available", "Claimed", "Incomplete") based on completion status.
- Ensure the UI adheres to the "tactical hardware" design system (ADR 008, using sharp edges, dashed borders, monospaced fonts, etc.).

## Acceptance Criteria
- [ ] A new route/dashboard view is created for the In-Game Trade Dashboard.
- [ ] The dashboard displays a list of NPC trades relevant to the loaded game version.
- [ ] Trades are visually tagged with their completion status ("Available", "Claimed", "Incomplete").
- [ ] The UI adheres strictly to the "tactical hardware" design system guidelines.
- [x] Tech Lead: Break down this Story into executable Tasks.
- [ ] task-676-716-in-game-trade-logic-hook
- [ ] task-676-717-in-game-trade-ui-component
- [ ] task-676-718-in-game-trade-dashboard-route
- [ ] task-676-719-in-game-trade-dashboard-qa
