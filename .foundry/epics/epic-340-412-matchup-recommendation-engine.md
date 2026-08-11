---
id: epic-340-412-matchup-recommendation-engine
type: EPIC
title: Active Party Matchup - Recommendation Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-11'
depends_on:
  - epic-340-411-save-data-extraction
jules_session_id: null
pr_number: null
parent: prd-134-340-active-party-matchup-analyzer
tags:
  - engine
  - recommendations
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Active Party Matchup - Recommendation Engine

## Description
This epic focuses on building the matchup simulation and recommendation logic. It will take the player's active party and calculate type effectiveness, stat advantages, and moveset coverage against the upcoming boss encounter. If the matchup is poor, it should recommend alternatives from the PC Box and TM inventory.

## Acceptance Criteria
- [ ] Build the matchup simulation engine to calculate type/stat/moveset advantages.
- [ ] Implement recommendation logic to scan PC Box and TM inventory for alternatives when matchups are poor.
- [ ] Generate actionable plain-text advice (e.g., "Swap your Grass-type for the Level X Water-type in Box 2").
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).