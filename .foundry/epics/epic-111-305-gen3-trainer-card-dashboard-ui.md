---
id: epic-111-305-gen3-trainer-card-dashboard-ui
type: EPIC
title: 'Epic: Gen 3 Trainer Card Stars Dashboard UI'
status: PENDING
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-04'
depends_on:
  - epic-111-304-gen3-trainer-card-data-extraction
jules_session_id: null
pr_number: null
parent: prd-102-111-gen3-trainer-card-stars
tags:
  - ui
  - gen3
  - achievements
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Trainer Card Stars Dashboard UI

## Objective
Implement the UI components for the "Trainer Card Stars" dashboard to aggregate and display endgame completion metrics for Pokémon Emerald.

## Requirements

1. **Dashboard View:**
   - Create a new UI component/dashboard section to display the Trainer Card stars logic.
   - The UI should reflect the player's progress across the 5 macro-goals defined in the PRD (Hall of Fame, Hoenn Dex, National Dex, Master Rank Contests, Gold Symbols).
   - Display a visual representation of the Trainer Card or stars earned.

2. **Progress Indicators:**
   - Use checkmarks or boolean indicators for binary goals (like Hall of Fame).
   - Use progress bars or fractional text for granular goals (like 150/202 Hoenn Dex).

3. **Styling:**
   - Must adhere strictly to the 'tactical hardware' aesthetic (ADR 024, ADR 008).
   - Use `tactical-panel`, `font-mono`, `border-dashed`, and strictly avoid rounded corners (`rounded-none`).
   - For progress bars, use segmented terminal blocks `[ SHEEN ]` rather than smooth HTML5 progress bars to mimic the rugged CRT look.

4. **Integration:**
   - The UI must integrate with the data parsing output from Epic 111-304 to display live data from the loaded save file.

## Acceptance Criteria
- [ ] Break down into Stories for UI implementation.
- [ ] Ensure a final STORY is generated explicitly dedicated to Integration and E2E Verification.
