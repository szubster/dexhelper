---
id: prd-119-118-gen2-unown-dex-tracker
type: PRD
title: Gen 2 Unown Dex Progress Tracker
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-19'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '1134336885660559134'
parent: idea-119-gen2-unown-dex-tracker
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

## Requirements
1. Extract the caught Unown forms from the save file (utilizing the Gen 2 Unown Dex save block data).
2. Extract the event flags related to the four Ruins of Alph sliding puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte).
3. Display a visual grid of the 26 Unown letters, highlighting which ones have been caught.
4. Provide actionable warnings if the player is missing Unown forms because they have not completed the requisite puzzle. For example, if they are missing forms unlocked by the Ho-Oh puzzle, the dashboard should explicitly state: "You must complete the Ho-Oh puzzle in the Ruins of Alph to encounter more Unown forms."

## Epic Breakdown Task
- Break this PRD down into one or more epics to implement the memory extraction logic and the UI presentation.
