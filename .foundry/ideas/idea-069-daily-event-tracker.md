---
id: idea-069-daily-event-tracker
type: IDEA
title: Gen 2 Daily and Weekly Event Tracker
status: PENDING
owner_persona: product_manager
created_at: '2026-06-04'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen2
  - daily-events
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 2 Daily and Weekly Event Tracker

## Context
Generation 2 introduced a Real Time Clock (RTC) and numerous time-gated mechanics, such as the Bug Catching Contest (Tuesday/Thursday/Saturday), the S.S. Aqua sailings, daily swarms, the daily Lapras in Union Cave (Friday), the Haircut Brothers, and the daily Mystery Gift. Because the game relies entirely on the player remembering these days and times, it creates significant friction for players trying to optimize their playthrough or complete their Pokédex.

## Proposal
Leverage DexHelper's deep save file parsing to track event flags, combined with the device's local clock, to build a dynamic "Daily/Weekly Event Checklist". Since RTC is not reliably stored in all emulator `.sav` files, we will use the user's system time as the source of truth for the current day.
- **Dynamic Daily Agenda:** Upon loading a save file, the app reads the current system day and presents a checklist of what events are available *today* (e.g., "It's Friday: Catch Lapras in Union Cave!").
- **Smart Filtering:** Filter the daily events based on the player's Pokédex completion. Only show events that allow the player to catch Pokémon they do not currently have.
- **State Validation:** Check event flags in the save file to determine if the player has *already* completed a daily event (like getting a haircut or completing a trade), greying it out on the checklist.
- **Future Forecasting:** Allow players to see what events are coming up in the next few days to help them plan their playtime.

## Value Proposition
This feature transforms DexHelper from a static data viewer into an active, intelligent companion app. It directly addresses the pain points of retro game mechanics by automatically surfacing hidden state and saving players from relying on external wikis or manual notes.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD to define the specific event flags that need to be parsed and outline the UI checklist component.
