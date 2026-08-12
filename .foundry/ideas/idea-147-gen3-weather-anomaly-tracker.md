---
id: idea-147-gen3-weather-anomaly-tracker
type: IDEA
title: Gen 3 Weather Anomaly Tracker (Groudon & Kyogre)
status: READY
owner_persona: product_manager
created_at: '2026-08-12'
updated_at: '2026-08-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - gen3
  - tracker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 3 Weather Anomaly Tracker (Groudon & Kyogre)

## Context & Problem Statement
In Pokemon Emerald, after defeating the Elite Four, the weather institute occasionally reports severe weather anomalies (heavy rain or intense sunshine) on specific routes. These anomalies indicate the temporary presence of the legendary Pokemon Kyogre (Marine Cave) or Groudon (Terra Cave). The player has to travel to the Weather Institute, speak to the scientist to learn the current active route, and travel there quickly. If they are too slow, the anomaly moves to another route, requiring another trip to the Weather Institute.

This is a classic time-based/event-based hunt that requires frustrating backtracking if the player misses the window or forgets which route the scientist mentioned.

## Proposed Solution
Leverage DexHelper's save parsing engine to read the active weather anomaly event flags and variables in the Gen 3 save file.
- **Anomaly Dashboard/Overlay:** Display whether an anomaly is currently active, what type it is (Drought vs. Drizzle), and exactly which Route it is currently affecting.
- **Map Integration:** Highlight the affected route on the DexHelper Map UI with a weather icon.

## Value Proposition
This eliminates the need for tedious backtracking to the Weather Institute, streamlining the post-game legendary hunt for Kyogre and Groudon. It perfectly aligns with DexHelper's vision as a premium companion app that exposes hidden or tedious game states to the player in a clean UI.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD outlining the event flags/variables responsible for Terra Cave and Marine Cave locations and the UI integration strategy.