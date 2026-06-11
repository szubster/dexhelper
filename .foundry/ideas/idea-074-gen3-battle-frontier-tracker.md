---
id: idea-074-gen3-battle-frontier-tracker
type: IDEA
title: Gen 3 Battle Frontier Dashboard
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '3672308030394080779'
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - endgame
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Battle Frontier Dashboard

## Context
In Generation 3 (specifically Emerald), the Battle Frontier is the ultimate endgame challenge, featuring 7 distinct facilities (Battle Tower, Factory, Arena, etc.). Each facility tracks current win streaks, max records, Battle Points (BP), and Frontier Symbols (Silver/Gold). Currently, checking this progress in-game requires players to physically travel to each facility and talk to specific NPCs or check multiple pages of their Frontier Pass, which is highly tedious and fragmented.

## Proposal
Leverage DexHelper's programmatic save parsing to extract all Battle Frontier data and aggregate it into a single, unified "Battle Frontier Dashboard".

- **Unified Status View:** Display the player's current win streak, all-time record, and acquired Symbols (Silver/Gold) for all 7 facilities on one screen.
- **BP Wallet:** Prominently display the player's current total Battle Points (BP).
- **Progress Tracking:** Visually highlight how close the player is to reaching the next Frontier Brain encounter (e.g., "7 more wins until Silver Symbol at the Battle Pike").

## Value Proposition
Centralizing highly distributed, endgame state data into a unified, easy-to-read dashboard perfectly aligns with DexHelper's vision as a premium companion app. It removes the friction of in-game navigation and provides hardcore players with a clear, actionable overview of their progress toward one of the most difficult challenges in the entire franchise.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD to outline the technical approach for parsing Frontier data from the Emerald save structure and designing the unified dashboard UI.
- [ ] prd-074-046-gen3-battle-frontier-tracker
