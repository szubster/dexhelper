---
id: epic-118-338-gen2-unown-dex-data-extraction
type: EPIC
title: Gen 2 Unown Dex Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-20'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '9631422059218650108'
parent: prd-119-118-gen2-unown-dex-tracker
tags:
  - feature
  - gen2
  - unown
rejection_count: 0
rejection_reason: ''
---

# Gen 2 Unown Dex Data Extraction

## Context
As outlined in the PRD (`prd-119-118-gen2-unown-dex-tracker`), the first step to building the Unown Dex tracker is to parse the relevant data from the Gen 2 save file. We need to extract the caught Unown forms from the Unown Dex save block data, as well as the event flags for the four Ruins of Alph sliding puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte).

## Acceptance Criteria
- [ ] Implement parsing logic to extract the caught Unown forms from Gen 2 save data.
- [ ] Implement parsing logic to extract the event flags for the four Ruins of Alph puzzles (Kabuto, Aerodactyl, Ho-Oh, Omanyte).
- [ ] Ensure unit tests are added to verify correct parsing of both Unown Dex data and event flags.
