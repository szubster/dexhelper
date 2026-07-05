---
id: prd-100-106-static-encounter-tracker
type: PRD
title: Gen 1-3 Static Encounter & Legendary Checklist
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: '12905265120070037452'
pr_number: null
parent: idea-100-static-encounter-tracker
tags:
  - feature
  - gen1
  - gen2
  - gen3
research_references: []
notes: ''
rejection_reason: ''
---

# PRD: Gen 1-3 Static Encounter & Legendary Checklist

## Problem Statement
For players revisiting old Pokémon save files (Gens 1-3) or trying to catch everything available, figuring out which static encounters (e.g., Snorlax, Sudowoodo, Mewtwo, Rayquaza) they have already completed requires physical in-game travel and guesswork. These encounters are one-time events, and once completed, the event flag is permanently set. There is currently no easy way to view a checklist of these completed and remaining static encounters based on the actual save file state.

## Target Audience
Completionists and players revisiting old save files who want to track their progress on legendary and static encounters.

## Scope
- Extract event flags for all stationary encounters across Generations 1, 2, and 3.
- Develop a unified checklist UI displaying completed and available static encounters.
- Provide actionable hints (location, level, prerequisites) for available encounters.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into EPIC nodes for Gen 1, Gen 2, and Gen 3 event flag parsing and checklist UI implementation.
