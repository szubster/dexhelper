---
id: epic-051-095-friendship-tracker-ui
type: EPIC
title: Friendship Tracker UI & Actionable Insights
status: PENDING
owner_persona: story_owner
created_at: "2026-06-16"
updated_at: "2026-06-16"
depends_on:
  - epic-051-094-friendship-data-extraction
jules_session_id: null
pr_number: null
parent: prd-081-051-friendship-evolution-tracker
tags: ["ui", "frontend", "companion-app"]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Friendship Tracker UI & Actionable Insights

## Description
Develop the user interface to display the extracted Friendship data, calculate move powers, filter relevant Pokémon, and provide actionable estimates to reach the evolution threshold.

## Requirements
*   **Display:** Show the numeric Friendship value (0-255) and a progress bar targeting 220.
*   **Calculations:** Calculate and display the base power for Return and Frustration based on current Friendship.
*   **Filtering:** Add a filter to the Pokémon view to show *only* species that evolve via Friendship. Sort this view by proximity to the 220 threshold.
*   **Insights:** Implement a heuristic engine to estimate "Actions Needed" (e.g., number of steps or Vitamins required) to reach 220 Friendship, and display this on the UI.
*   Must adhere to Tailwind v4 utility guidelines and the app's aesthetic constraints (e.g., sharp edges, monospaced fonts).

## Acceptance Criteria
- [ ] UI component implemented to display Numeric Friendship and Progress Bar (target 220).
- [ ] UI displays calculated base power for Return and Frustration.
- [ ] Filtering logic implemented to show only Friendship-evolving Pokémon.
- [ ] Sorting logic implemented to order by closeness to 220.
- [ ] Heuristic logic implemented to calculate and display estimated "actions needed" (Vitamins/Steps).
- [ ] End-to-end tests implemented to verify UI rendering and filtering logic.
