---
id: idea-516-gen3-vs-seeker-tracker
type: IDEA
title: Gen 3 VS Seeker Charge & Trainer Re-match Tracker
status: READY
owner_persona: product_manager
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
research_references: []
---

# Idea: Gen 3 VS Seeker Charge & Trainer Re-match Tracker

## Context
In Generation 3 (FireRed and LeafGreen), the VS Seeker is a key item used to find trainers on the current route who are ready for a rematch. It requires a charge of 100 steps to use. Players often walk around aimlessly trying to charge it, or use it on a route only to find no trainers are ready to battle.

## Proposal
Leverage DexHelper's programmatic save file parsing to read the VS Seeker's current step charge counter and the internal flags that determine which specific trainers are currently eligible and ready for a rematch.

We can create a dashboard or map overlay that shows:
1. The current step charge of the VS Seeker (e.g., 45/100 steps).
2. A list or visual indication of all routes where trainers are currently ready for a rematch, saving the player from wasting the charge on empty routes.

## Value Proposition
- Eliminates the guesswork and wasted time of charging and using the VS Seeker on routes with no ready trainers.
- Aids players in efficient EV training and money farming by directing them straight to rematchable trainers.

## Acceptance Criteria
- [ ] prd-516-517-gen3-vs-seeker-tracker
