---
id: task-409-418-gen3-event-inventory-extraction-parser-impl
type: TASK
title: Gen 3 Event Inventory Items Extraction Parser Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-404-409-gen3-event-inventory-extraction
tags:
  - gen3
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Event Inventory Items Extraction Parser Implementation

## Overview
Implement the binary extraction logic of key event items from the player's Bag in Gen 3 save files.

## Requirements
- Parse the player's Bag to check for key event items: `0x0113` Eon Ticket, `0x0172` Mystic Ticket, `0x0173` Aurora Ticket, `0x0174` Old Sea Map.
- Adhere to the Save File Parsing & Extraction Guidelines (Section 13 of `.foundry/docs/schema.md`), which requires module-level constants, avoiding magic numbers, using relative offsets for Gen 3, and catching `RangeError` with the message "The save file is corrupted or incomplete.".
- Write unit tests to verify the binary parsing logic works correctly against Gen 3 save files.

## Acceptance Criteria
- [x] Implement Gen 3 event inventory item extraction parser.
- [x] Module-level constants are used for memory offsets, lengths, bit locations, shifts, etc.
- [x] Relative offsets are used with the resolved section offset.
- [x] `RangeError` is handled properly with the exact error message.
- [x] Unit tests verify the parsing logic.
