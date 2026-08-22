---
id: idea-419-gen2-phone-caller-predictor
type: IDEA
title: Gen 2 Phone Caller Schedule Predictor
status: READY
owner_persona: product_manager
created_at: '2026-08-22'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - phone
  - pokegear
  - schedule
  - predictor
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Phone Caller Schedule Predictor

## Context & Vision
In Generation 2 (Gold, Silver, Crystal), the Pokégear Phone is a central feature. Players can register phone numbers of various NPCs. These NPCs randomly call the player to offer rematches, give out rare items (like evolutionary stones), or notify about swarms. While IDEA-090 proposes an active caller dashboard, it focuses on the current state.

This idea expands upon the Pokégear Phone by predicting *when* calls are more likely to happen based on the internal step counter and the current real-time clock (RTC) data parsed from the save file.

By understanding the internal RNG seed and step counter mechanics that govern phone calls, DexHelper can predict the likelihood of an imminent call and specifically identify which NPCs (e.g., Schoolboy Alan for Fire Stones, Lass Dana for Thunderstones) are in their active "calling windows."

## Value Proposition & Key Features
- **Call Probability Indicator:** Display a visual gauge indicating the likelihood of an incoming call based on the player's recent step count and current game state.
- **Active Window Timetable:** Cross-reference the parsed RTC with the known schedules of valuable NPC callers (those who give items or trigger swarms) to show a "schedule" of who is most likely to call right now.
- **Grind Optimization:** Hardcore players looking for specific evolutionary stones can use this to optimize their gameplay, knowing when to run around to advance the step counter during a specific NPC's active window.

## Proposed Architecture
1.  **Save Parser Extension:** Update the Gen 2 save parser to extract the internal step counter related to phone calls and any relevant RNG seeds.
2.  **Schedule Data Source:** Implement a static data structure mapping registered NPC phone numbers to their specific active calling windows (days of the week, times of day).
3.  **Prediction Engine:** Create a utility function that combines the extracted step counter, RTC time, and schedule data to generate a probability score for each registered NPC.
4.  **UI Component:** Build a `PhoneSchedulePredictor` component to visualize this data alongside the Pokégear dashboard.

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD detailing the prediction algorithm requirements and the UI design.
- [ ] Tech Lead: Define the technical tasks for extracting the step counter and building the prediction engine.
