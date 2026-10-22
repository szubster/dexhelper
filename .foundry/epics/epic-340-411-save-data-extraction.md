---
id: epic-340-411-save-data-extraction
type: EPIC
title: Active Party Matchup - Save Data Extraction
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-11'
updated_at: '2026-10-20'
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
locks: []
---

# Epic: Active Party Matchup - Save Data Extraction

## Description
This epic focuses on building the underlying data extraction for the Active Party Matchup Analyzer. The parsing engine must read story progression flags to identify the next major battle (Gym Leaders, Rivals, Evil Bosses), alongside extracting the Active Party, PC Box, and TM inventory.

## Acceptance Criteria
- [x] Parse narrative/story progression flags to determine upcoming major bosses.
- [x] Extract Active Party data and synchronize it with the matchup context.
- [x] Extract PC Box and TM Inventory data concurrently to be used by the recommendation engine.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).

- [x] story-411-420-narrative-progression-flags
- [x] story-411-421-active-party-extraction
- [x] story-411-422-pc-box-and-tm-extraction
- [x] story-411-423-save-data-extraction-e2e
