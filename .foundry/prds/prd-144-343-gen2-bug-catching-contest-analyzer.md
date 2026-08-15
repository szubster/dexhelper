---
id: prd-144-343-gen2-bug-catching-contest-analyzer
type: PRD
title: Gen 2 Bug-Catching Contest Score Analyzer
status: READY
owner_persona: epic_planner
created_at: '2026-08-10'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-144-gen2-bug-catching-contest-analyzer
tags:
  - feature
  - gen2
  - utility
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Bug-Catching Contest Score Analyzer PRD

## Overview
This PRD outlines the requirements for a "Bug-Catching Contest Score Analyzer" in DexHelper for Generation 2 (Gold, Silver, Crystal) games. The analyzer will parse the user's save state to identify the Pokémon currently caught during an active Bug-Catching Contest and calculate its exact contest score, win probability against NPC competitors, and potential max score.

## Target Audience
Players of Pokémon Gold, Silver, and Crystal looking to optimize their chances of winning the Bug-Catching Contest, specifically to obtain a Sun Stone, by making informed decisions based on hidden game state.

## Core Features

1.  **Save State Parsing:**
    *   Extract the currently caught Bug-Catching Contest Pokémon data from the Gen 2 save file.
    *   Extract relevant hidden stats including DVs (Defense, Attack, Special, Speed), Level, Max HP, Current HP, and held item.
2.  **Precise Score Calculation:**
    *   Implement the exact Gen 2 scoring algorithm. The score is the sum of:
        *   `4 * Max HP`
        *   `Sum of the Pokémon's other stats (Attack, Defense, Special Attack, Special Defense, Speed)`
        *   `IV Bonus (Up to 29 points)`:
            *   `16 points` if `floor(Defense IV / 2)` is an odd number.
            *   `8 points` if `floor(Attack IV / 2)` is an odd number.
            *   `4 points` if `floor(Special IV / 2)` is an odd number.
            *   `1 point` if `floor(Speed IV / 2)` is an odd number.
            *   *Note: Shiny Pokémon automatically earn all 29 IV Bonus points.*
        *   `floor(Current HP / 8)`
        *   `1 point` if the Pokémon is holding an item.
3.  **Win Probability & Competitor Comparison:**
    *   Compare the player's calculated score against the possible scores of NPC competitors (e.g., Cooltrainer Nick, Bug Catcher Don).
    *   Calculate and display a "Win/Lose" probability or threshold indicating if the current catch is sufficient to secure 1st place. (Note: The lowest possible score to guarantee a win against the weakest possible NPC combination is 264, but actual scores vary).
4.  **Target Optimization:**
    *   Calculate and display the theoretical maximum possible score for the specific caught species (e.g., a Level 14 Scyther with perfect DVs and 100% HP maxes out at 386).
    *   Provide feedback to the user on whether they should keep hunting based on their current catch vs. the theoretical maximum.

## User Interface Requirements

1.  **Analyzer Dashboard:**
    *   Adhere to the "tactical hardware/snooping" aesthetic defined in ADR 008 and ADR 024 (`rounded-none`, `border-dashed`, monospaced fonts).
    *   **Current Catch Display:** Show the sprite, species name, Level, and current/max HP of the caught Pokémon.
    *   **Detailed Stats Panel:** Display the exact DVs and calculated stats.
    *   **Score Breakdown:** Visually break down the score calculation (HP points + Stat points + IV points + Current HP points + Item points = Total Score).
    *   **Win Prediction Module:** A clear indicator (e.g., "HIGH PROBABILITY OF WINNING", "INSUFFICIENT SCORE") based on the competitor comparison logic.
    *   **Optimization Bar:** A visual progress bar comparing the current score to the theoretical max score for that species.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into EPIC nodes covering save data extraction, score calculation logic, and UI implementation.
