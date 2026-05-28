---
id: task-071-134-run-dashboard-ui-impl
type: TASK
title: Implement Dashboard Alive Team View
status: FAILED
owner_persona: coder
created_at: '2026-05-22'
updated_at: '2026-05-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-034-071-run-dashboard-ui
tags:
  - feature
  - nuzlocke
  - verification
rejection_count: 0
rejection_reason: 'The AliveTeamView incorrectly displays the Original Trainer name (otName) instead of the Pokémon nickname or species name. The save parser needs to extract nicknames, and the UI should use them instead.'
notes: ''
---

# TASK: Implement Dashboard Alive Team View

## Description
Implement the "Alive" team view for the Run Dashboard UI.

## Acceptance Criteria
- [ ] Implement the UI to display the current "Alive" Nuzlocke team.
- [ ] Ensure the UI components match the Nuzlocke Tracker mode requirements.
