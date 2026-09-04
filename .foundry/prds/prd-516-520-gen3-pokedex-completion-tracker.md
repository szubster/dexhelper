---
id: prd-516-520-gen3-pokedex-completion-tracker
type: PRD
title: Gen 3 Pokédex Completion & Missed Achievement Tracker
status: READY
owner_persona: epic_planner
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-516-gen3-pokedex-completion-tracker
tags:
  - dexhelper
research_references: []
---

# PRD: Gen 3 Pokédex Completion & Missed Achievement Tracker

## Context
In Generation 3 (FireRed, LeafGreen, Emerald), completing the Pokédex and earning all possible achievements (like Trainer Card stars, obtaining rare items, and triggering specific in-game events) is a massive undertaking. Players focused on progression rather than endless farming often want to know exactly what they are missing before they migrate their team to the next generation (Gen 4).

## Proposal
Leverage DexHelper's programmatic save file parsing to scan the player's save for completion status of major milestones and Pokédex entries, specifically tailored for players preparing to transition to the next game.

We can create a "Generation Transition Checklist" dashboard that shows:
1.  **Pokédex Gaps:** A direct list of Pokémon missing from the Regional and National Pokédex that can still be caught or evolved in the current game, highlighting version exclusives that require trading.
2.  **Missed Milestones & Items:** A checklist of major, non-repeatable achievements or valuable items the player might have missed before moving on (e.g., missed TMs, uncollected Master Ball, unfinished side quests like the Fame Checker or Sevii Islands plot).
3.  **Trainer Card Status:** Progress towards the remaining Trainer Card stars.

## Value Proposition
-   Provides a clear, actionable checklist for players who want to "finish" their current game before moving on, ensuring they don't leave valuable items or achievable milestones behind.
-   Shifts focus from repetitive farming (like EV training or contest ribbons) to macro-level completion goals.

## Acceptance Criteria
- [ ] epic_planner: Break down into Epics.
