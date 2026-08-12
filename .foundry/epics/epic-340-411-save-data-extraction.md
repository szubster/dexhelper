---
id: epic-340-411-save-data-extraction
type: EPIC
title: Active Party Matchup - Save Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-08-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-134-340-active-party-matchup-analyzer
tags:
  - extraction
  - gen1
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Active Party Matchup - Save Data Extraction

## Description
This epic focuses on building the underlying data extraction for the Active Party Matchup Analyzer. The parsing engine must read story progression flags to identify the next major battle (Gym Leaders, Rivals, Evil Bosses), alongside extracting the Active Party, PC Box, and TM inventory.

## Acceptance Criteria
- [ ] Parse narrative/story progression flags to determine upcoming major bosses.
- [ ] Extract Active Party data and synchronize it with the matchup context.
- [ ] Extract PC Box and TM Inventory data concurrently to be used by the recommendation engine.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).