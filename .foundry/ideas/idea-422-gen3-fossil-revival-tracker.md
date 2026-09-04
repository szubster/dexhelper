---
id: idea-422-gen3-fossil-revival-tracker
type: IDEA
title: Gen 3 Fossil Revival Tracker
status: READY
owner_persona: product_manager
created_at: '2026-08-27'
updated_at: '2026-08-27'
depends_on: []
jules_session_id: null
parent: null
tags:
  - dexhelper
  - gen3
  - tracking
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Fossil Revival Tracker

## 1. Context & Problem Statement
In Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen), reviving fossils requires visiting the Devon Corporation (RSE) or the Pokémon Lab on Cinnabar Island (FRLG), dropping off a fossil, waiting, and returning to collect the revived Pokémon.

Currently, DexHelper tracks static encounters, event items, and PC boxes. However, it lacks a dedicated tracker for fossils that are currently in the process of being revived. Players can drop off a fossil and forget about it, or be unsure if the revival process is complete.

## 2. Recommended Approach: Fossil Revival Tracking
Introduce a "Fossil Revival Tracker" component within the DexHelper dashboard for Gen 3 saves.

1. **Memory Offsets:**
   - Investigate and document the memory offsets and event flags responsible for tracking fossil drop-off status and revival completion.
   - For RSE, the Devon Corporation researcher handles the Root Fossil (Lileep) and Claw Fossil (Anorith).
   - For FRLG, the Cinnabar Lab handles the Helix Fossil (Omanyte), Dome Fossil (Kabuto), and Old Amber (Aerodactyl).
2. **Dashboard Integration:**
   - Create a new UI component that displays the current status of fossil revivals (e.g., "Ready for Pickup: Lileep", "Processing: Helix Fossil", "No Fossils Dropped Off").
3. **Save Parsing:**
   - Update the Gen 3 save parser to extract these specific event flags and variables.

## 3. Value Proposition
- **Completionist Assistance:** Helps players tracking their Living Dex remember to pick up their revived fossils.
- **Improved UX:** Removes the need for players to travel to the revival locations just to check the status.

## 4. Next Steps & Acceptance Criteria
- [x] Product Manager: Draft a PRD outlining the Fossil Revival Tracker UI and the specific data extraction requirements for RSE and FRLG.
- [ ] prd-422-520-gen3-fossil-revival-tracker
