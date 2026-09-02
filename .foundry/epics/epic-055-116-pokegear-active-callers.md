---
id: epic-055-116-pokegear-active-callers
type: EPIC
title: Pokegear Active Callers Dashboard
status: FAILED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-090-055-pokegear-phone-tracker
tags:
  - feature
  - gen2
  - ui
research_references: []
rejection_count: 0
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
locks: []
---
# Epic: Pokegear Active Callers Dashboard

## Objective
Create a dashboard view displaying all registered Pokegear NPCs and their current status in Generation 2 (Gold, Silver, Crystal).

## Requirements
- Parse the registered numbers list from the save file based on the research findings.
- Render the current status of each registered NPC on a centralized dashboard (e.g., "Ready for Rematch", "Has Item", "Idle").
- Provide a clean and responsive UI for tracking active callers.

## Acceptance Criteria
- [x] Create UI for Active Callers Dashboard
- [x] Implement save file parsing for registered numbers
- [x] Integrate parsed data with dashboard UI
- [x] story-116-283-parse-registered-numbers
- [x] story-116-284-active-callers-dashboard-ui
- [x] story-116-285-integrate-registered-numbers-ui
