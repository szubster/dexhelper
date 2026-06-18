---
id: research-116-204-gen3-battle-frontier-data
type: RESEARCH
title: Investigate Gen 3 Battle Frontier Data Structures
status: READY
owner_persona: researcher
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-116-169-battle-frontier-dashboard-impl
tags:
  - research
  - gen3
  - battle-frontier
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 Battle Frontier Data Structures

## Description
We need to implement the Battle Frontier Dashboard UI for Gen 3 saves, but currently lack the specific specifications. Please investigate the Gen 3 game logic, save files, or existing extraction scripts to find out:
1. The exact names of the 7 facilities in the Battle Frontier.
2. The data structure and save offsets for the BP (Battle Points) wallet.
3. The metrics, states, or offsets needed to visualize progress towards the next Frontier Brain encounter for each facility.

## Acceptance Criteria
- [ ] Determine the 7 facility names and their representation in the data layer.
- [ ] Determine how to extract BP wallet balance from the save file.
- [ ] Determine the progress metrics required to display Frontier Brain encounter progress.
- [ ] Update the knowledge base with the findings or output a data schema that can be consumed by the dashboard UI.
