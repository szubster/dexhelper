---
id: epic-121-404-gen3-e-reader-event-data-extraction
type: EPIC
title: Gen 3 E-Reader Event Data Extraction
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-06'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-121-gen3-e-reader-event-tracker
tags:
  - gen3
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 E-Reader Event Data Extraction

## Overview
This Epic handles the extraction of specific event flags and inventory data from Gen 3 save files to detect the presence of hardware and Mystery Gift events.

## Requirements
- Extract event flags (e.g., `FLAG_SYS_EON_TICKET_ENABLE`, `FLAG_ENABLE_MYSTERY_GIFT`, `FLAG_RECEIVED_AURORA_TICKET`).
- Check the player's Bag for key event items (e.g., 0x0113 Eon Ticket, 0x0172 Mystic Ticket, 0x0173 Aurora Ticket, 0x0174 Old Sea Map).
- Ensure the parsing adheres to Save File Parsing & Extraction Guidelines (module-level constants, relative offsets, and handling `RangeError`).
- Provide a clean data interface for the UI dashboard.

## Acceptance Criteria
- [x] Break down into STORY nodes for extraction logic and data structuring.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-404-408-gen3-event-flags-extraction
- [x] story-404-409-gen3-event-inventory-extraction
- [x] story-404-410-gen3-e-reader-data-e2e

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
