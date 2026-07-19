---
id: idea-119-gen2-unown-dex-tracker
type: IDEA
title: Gen 2 Unown Dex Progress Tracker
status: READY
owner_persona: product_manager
created_at: '2026-07-18'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
tags:
  - feature
  - gen2
  - unown
rejection_reason: ''
---

# Gen 2 Unown Dex Progress Tracker

## Context
In Generation 2 (Gold, Silver, Crystal), catching all 26 Unown forms is a significant endgame side quest tied to the Ruins of Alph puzzles. The in-game Unown Dex tracks which forms have been caught, but unlocking more Unown forms requires completing specific sliding puzzles in the Ruins of Alph chambers.

Currently, DexHelper provides an UnownDexPanel that highlights caught forms, but it lacks the contextual link to the requisite Ruins of Alph sliding puzzle event flags. Hardcore completionists would benefit greatly from a unified view that connects their caught Unown forms with the hidden puzzle completion flags.

## Proposal
Create a dedicated `Gen 2 Unown Dex Progress Tracker` dashboard. This feature will:
1. Extract the caught Unown forms from the save file (utilizing the Gen 2 Unown Dex save block data).
2. Extract the event flags related to the four Ruins of Alph sliding puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte).
3. Display a visual grid of the 26 Unown letters, highlighting which ones have been caught.
4. Provide actionable warnings if the player is missing Unown forms because they have not completed the requisite puzzle. For example, if they are missing forms unlocked by the Ho-Oh puzzle, the dashboard should explicitly state: "You must complete the Ho-Oh puzzle in the Ruins of Alph to encounter more Unown forms."

This aligns perfectly with DexHelper's vision as a premium companion app by surfacing hidden save state data and transforming a tedious, trial-and-error collection quest into a clear, actionable checklist.
