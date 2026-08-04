---
id: epic-111-401-gen3-trainer-card-dashboard-ui
type: EPIC
title: Epic - Gen 3 Trainer Card Dashboard UI
status: PENDING
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on:
  - epic-111-400-gen3-trainer-card-data-extraction
jules_session_id: null
pr_number: null
parent: prd-102-111-gen3-trainer-card-stars
tags:
  - feature
  - gen3
  - achievements
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Trainer Card Dashboard UI

## Description
Create the unified "Trainer Card Stars" dashboard for Pokemon Emerald. It will display a thematic visual representation of the Trainer Card and track completion for Hall of Fame, Pokedexes, Contests, and Battle Frontier.

## Acceptance Criteria
- [ ] Implement Trainer Card thematic visual view in the main Gen 3 dashboard following UI Aesthetic Constraints (ADR 008, tactical hardware style).
- [ ] Display current number of earned stars.
- [ ] Display detailed checkmarks and fractional progress bars for all sub-goals.
- [ ] Verify the implementation's exact alignment with the documentation schemas (e.g., Section 14 of .foundry/docs/schema.md) before marking tasks complete.
- [ ] Create a final STORY dedicated exclusively to Integration and E2E Verification.