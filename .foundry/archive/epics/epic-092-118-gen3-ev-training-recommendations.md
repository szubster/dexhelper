---
id: epic-092-118-gen3-ev-training-recommendations
type: EPIC
title: Epic - Gen 3 EV Training Recommendations
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-08-20'
depends_on:
  - epic-092-117-gen3-ev-dashboard-ui
jules_session_id: null
pr_number: null
parent: prd-092-056-gen3-ev-training-dashboard
tags:
  - gen3
  - recommendations
  - endgame
  - competitive
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-092-116-gen3-ev-data-extraction
notes: ''
---

# Epic - Gen 3 EV Training Recommendations

## 1. Objective
Develop the logic and UI to provide actionable route and trainer recommendations for optimal EV farming based on the Pokémon's current EVs and goals.

## 2. Background
This epic covers the training recommendations aspect of the Gen 3 EV Training Dashboard PRD (`prd-092-056-gen3-ev-training-dashboard.md`). It integrates with the dashboard UI created in `epic-092-117-gen3-ev-dashboard-ui`.

## 3. Scope
- Integrate recommendation logic that evaluates a Pokémon's current EV distribution and suggests routes or specific trainers that yield the missing required EVs.
- The logic can assume common competitive builds or allow basic goal setting.
- Display these recommendations within the EV visualization dashboard.

## 4. Acceptance Criteria
- [ ] Training recommendations provide actionable route/trainer data for EV farming.
