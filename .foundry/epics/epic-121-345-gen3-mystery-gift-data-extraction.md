---
id: epic-121-345-gen3-mystery-gift-data-extraction
type: EPIC
title: Gen 3 Mystery Gift Data Extraction
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-25'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '11277121843102391947'
pr_number: null
parent: prd-121-336-gen3-mystery-gift-viewer
tags:
  - gen3
  - mystery-gift
  - data-extraction
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Mystery Gift Data Extraction

## Overview
This Epic covers the extraction of Mystery Gift data (including Wonder Cards and event flags for special islands like Aurora Ticket/MysticTicket) from Gen 3 save files (FireRed, LeafGreen, Emerald). It establishes the parsing logic required to expose this data cleanly to the application without modifying the original save.

## Prerequisites
- Knowledge of Gen 3 save file structure and Mystery Gift memory blocks.

## Acceptance Criteria
- [x] Extract Wonder Card data from Gen 3 save files.
- [x] Extract active event flags associated with Mystery Gift (e.g., Aurora Ticket, MysticTicket).
- [x] Integrate with the existing save file parsing engine in DexHelper.
- [x] Story Owner: Break down this Epic into manageable Stories.
- [x] story-345-354-gen3-wonder-card-extraction
- [ ] story-345-477-gen3-mystery-gift-event-flags
- [ ] story-345-478-gen3-mystery-gift-e2e-verification
