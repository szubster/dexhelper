---
id: epic-056-119-in-game-trade-data-parsing
type: EPIC
title: Parse In-Game Trade Data (Gen 2/3)
status: PENDING
owner_persona: story_owner
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-095-056-in-game-trade-assistant
tags:
  - parsing
  - data-extraction
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Parse In-Game Trade Data (Gen 2/3)

## Context
As part of the In-Game Trade Assistant (PRD 056), we need to extract completed trade event flags from Gen 2 and Gen 3 save files. This data will be used to track which in-game trades the player has already executed, preventing them from being suggested again.

## Requirements
- Parse event flags for completed in-game trades in Generation 2 save files.
- Parse event flags for completed in-game trades in Generation 3 save files, adhering to ADR 010 (`DataView` usage).
- Expose a unified data structure representing the status of all available trades.

## Acceptance Criteria
- [ ] Break down into Stories (e.g., Gen 2 Extraction, Gen 3 Extraction).
