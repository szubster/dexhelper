---
id: idea-099-gen3-shoal-cave-tracker
type: IDEA
title: Gen 3 Shoal Cave Tide Tracker
status: BLOCKED
owner_persona: tpm
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - shoal-cave
  - rtc
research_references: []
rejection_count: 0
rejection_reason: >-
  ADR 025 specifically forbids relying on extracting RTC state from save files
  due to emulator inconsistency and cartridge dumps.
notes: ''
---

# Idea: Gen 3 Shoal Cave Tide Tracker

## Context
In Generation 3 (Ruby/Sapphire/Emerald), Shoal Cave is a unique location governed by a real-time tide mechanic based on the internal Real-Time Clock (RTC).
- High Tide (09:00–15:00, 21:00–03:00) provides access to Shoal Shells.
- Low Tide (03:00–09:00, 15:00–21:00) provides access to Shoal Salts and an exclusive ice room containing Snorunt and Never-Melt Ice.
Because the RTC is completely opaque in-game (unless standing in the player's bedroom) and heavily reliant on the game's notoriously fragile dry battery mechanic, players often struggle to know when they can gather these necessary items to craft the Shell Bell.

## Proposal
Since DexHelper already parses the `.sav` file and can extract the exact internal RTC value, we can provide a highly accurate, deterministic Shoal Cave dashboard.
- **Tide Predictor:** Display the exact current tide state (High/Low) based on the save file's time.
- **Battery Warning:** Alert the player if their RTC is stopped (dry battery), meaning the tide will permanently be locked.
- **Resource Tracking:** Optionally track whether the 4 Shoal Shells and 4 Shoal Salts have been collected for the day by reading the respective hidden item event flags.

## Value Proposition
This feature transforms an obtuse, time-gated grind into a predictable, actionable dashboard. By leveraging offline-first save parsing to cross-reference RTC data and hidden item flags, DexHelper provides immediate utility for endgame players trying to craft Shell Bells or catch Snorunt without constantly running to the cave just to check the water level. This perfectly aligns with our positioning as a premium, intelligent companion app.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD detailing how to extract the RTC state, parse the Shoal Cave item event flags, and design the tide tracker dashboard UI.
