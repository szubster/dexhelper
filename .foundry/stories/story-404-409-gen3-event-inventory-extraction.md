---
id: story-404-409-gen3-event-inventory-extraction
type: STORY
title: Gen 3 Event Inventory Items Extraction
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-121-404-gen3-e-reader-event-data-extraction
tags:
  - gen3
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Event Inventory Items Extraction

## Overview
Implement the extraction of key event items from the player's Bag in Gen 3 save files.

## Requirements
- Check the player's Bag for key event items: 0x0113 Eon Ticket, 0x0172 Mystic Ticket, 0x0173 Aurora Ticket, 0x0174 Old Sea Map.
- Adhere to Save File Parsing & Extraction Guidelines (module-level constants, relative offsets, and handling `RangeError`).
- Expose this data for the UI dashboard.

## Acceptance Criteria
- [x] Break down into TASK nodes for inventory extraction and testing.
- [x] task-409-418-gen3-event-inventory-extraction-parser-impl
- [x] task-409-419-gen3-event-inventory-extraction-parser-qa
- [x] task-409-420-gen3-event-inventory-extraction-ui-impl
- [x] task-409-421-gen3-event-inventory-extraction-ui-qa
