---
id: idea-517-gen2-radio-password-tracker
type: IDEA
title: Gen 2 Buena's Password Tracker & Alert System
status: PENDING
owner_persona: product_manager
created_at: '2026-09-04'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - gen2
  - daily-events
research_references: []
---

# Idea: Gen 2 Buena's Password Tracker & Alert System

## Context
In Generation 2 (specifically Crystal version), Buena's Password is a daily radio show broadcast from the Goldenrod Radio Tower between 6:00 PM and Midnight. Players must listen to the show, remember the password, and then physically travel to the Radio Tower to tell Buena the password to earn points. These points can be redeemed for rare and valuable items (like the Exp. Share, Rare Candy, or Evolution Stones).

This mechanic is highly missable because it requires the player to play during a specific real-world time window (6 PM to midnight) and actively remember to participate.

## Proposal
Leverage DexHelper's real-time clock integration and save file parsing to build a proactive Buena's Password Tracker for Gen 2.

1.  **Broadcast Alerts:** Since DexHelper knows the system time and the save file version (Crystal), it can surface a prominent alert or notification in the UI when the local time is between 6:00 PM and Midnight: "Buena's Password is broadcasting now!"
2.  **Point Tracking:** Parse the save file to read the player's current Blue Card point total. Display this clearly in the dashboard, alongside a progress bar towards their target reward.
3.  **Completion State Validation:** Read the daily event flags in the save file to determine if the player has *already* successfully submitted the password today. If they have, suppress the alert and grey out the daily task to prevent unnecessary backtracking to Goldenrod City.

## Value Proposition
This transforms a highly missable, time-restricted mechanic into an easily trackable daily goal. It encourages daily engagement, helps players optimize their progression by guaranteeing they don't miss out on rare items, and perfectly complements existing daily event trackers (like IDEA-069) by adding real-time, time-of-day awareness.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD to define the exact Blue Card memory offsets and daily completion event flags needed from the Crystal save structure.
