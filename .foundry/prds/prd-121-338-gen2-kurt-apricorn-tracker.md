---
id: prd-121-338-gen2-kurt-apricorn-tracker
type: PRD
title: Gen 2 Kurt Apricorn Tracker
status: READY
owner_persona: epic_planner
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-121-gen2-kurt-apricorn-tracker
tags:
  - feature
  - gen2
  - items
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Kurt Apricorn Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), players can harvest Apricorns and give them to Kurt in Azalea Town to craft special Poké Balls (like the Heavy Ball, Lure Ball, Fast Ball). However, this is a multi-day process. The player gives Kurt an Apricorn, and must wait until the next real-world day to receive the crafted item. The game provides zero UI or journal indicating what type of Apricorn was given, how many, or if the order is ready for pickup.

## Proposal
Leverage DexHelper's save file parsing to track the hidden event flags related to Kurt's crafting state.
- **Active Order Tracker:** Detect if the player has given Kurt an Apricorn. Display what type of Apricorn was given, the expected resulting Poké Ball, and the quantity.
- **Ready for Pickup Notification:** By checking the state against the system clock (similarly to the Daily Events Tracker), highlight when Kurt's crafting is finished and the balls are ready for pickup.
- **Resource Dashboard:** Show a quick tally of uncrafted Apricorns currently in the player's bag vs. what is currently with Kurt.

## Acceptance Criteria
- [ ] epic_planner: Break this PRD down into actionable Epics.
