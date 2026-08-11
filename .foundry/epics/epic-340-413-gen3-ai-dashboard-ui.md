---
id: epic-340-413-gen3-ai-dashboard-ui
type: EPIC
title: Gen 3 AI Move Predictor - Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-08-08'
updated_at: '2026-08-11'
depends_on:
  - epic-340-412-gen3-ai-simulation-engine
jules_session_id: null
pr_number: null
parent: prd-136-340-gen3-ai-move-predictor
tags:
  - gen3
  - ai
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 AI Move Predictor - Dashboard UI

## Objective
Create the user interface for the Trainer AI Predictor module, displaying the simulation results to the user.

## Scope
- Create a dashboard displaying the upcoming major trainer.
- Allow the user to manually override and select a specific trainer.
- Build a side-by-side battle simulation view showing the player's active Pokémon and the opponent's active/next Pokémon.
- Display the predicted moves with likelihood percentages (or a deterministic single prediction).
- Integrate the UI with the save file state and the simulation engine.

## Constraints
- Adhere strictly to the "tactical hardware/snooping" aesthetic outlined in ADR 008 (sharp edges, dashed borders, monospaced telemetry fonts).

## Acceptance Criteria
- [ ] Story Owner: Break down into actionable STORY nodes.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
