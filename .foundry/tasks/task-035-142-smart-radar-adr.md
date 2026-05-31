---
id: task-035-142-smart-radar-adr
type: TASK
title: Smart Route Radar ADR
status: COMPLETED
owner_persona: architect
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-064-035-smart-route-radar
tags:
  - feature
  - ux
  - map
  - exploration
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Smart Route Radar Architecture Decision Record

## Objective
Convert PRD `prd-064-035-smart-route-radar` into an ADR detailing the system design for joining static encounter data with dynamic save state in the UI.

## Acceptance Criteria
- [x] Create an ADR in `.foundry/docs/adrs/` detailing how to unify static encounter data with dynamic save state for the Smart Route Radar map UI.
- [x] Document the data structures and flow for the heatmap UI layer.
- [x] Define how interactive map nodes will resolve specific encounters (rates, conditions).
