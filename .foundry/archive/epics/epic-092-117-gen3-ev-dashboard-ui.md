---
id: epic-092-117-gen3-ev-dashboard-ui
type: EPIC
title: Epic - Gen 3 EV Dashboard UI
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-08-20'
depends_on:
  - epic-092-116-gen3-ev-data-extraction
jules_session_id: null
pr_number: null
parent: prd-092-056-gen3-ev-training-dashboard
tags:
  - gen3
  - ui
  - endgame
  - competitive
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-092-116-gen3-ev-data-extraction
notes: ''
---

# Epic - Gen 3 EV Dashboard UI

## 1. Objective
Develop the EV visualization dashboard UI to show EV distribution and remaining values for selected Pokémon in Generation 3.

## 2. Background
This epic covers the frontend UI requirements of the Gen 3 EV Training Dashboard PRD (`prd-092-056-gen3-ev-training-dashboard.md`). It relies on the data extraction logic implemented in `epic-092-116-gen3-ev-data-extraction`.

## 3. Scope
- Create a dashboard component to display the EV distribution for selected Pokémon.
- Use a radar chart and/or a detailed bar graph for visualization.
- Show exact numerical values for each stat's EV out of the individual stat cap (255) and the total accumulated EVs out of the absolute maximum (510).
- Display an "EVs Remaining" counter clearly indicating how many points are left to train.
- Ensure the UI components strictly follow the tactical hardware aesthetic guidelines (ADR 008, ADR 024) with monospaced fonts, sharp edges, and dashed borders.
- Efficiently render the dashboard without delaying initial load.

## 4. Acceptance Criteria
- [ ] The dashboard accurately visualizes the EV distribution and total remaining EVs.
- [ ] UI components strictly follow the tactical aesthetic guidelines.
