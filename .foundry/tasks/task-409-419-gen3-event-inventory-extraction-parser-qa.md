---
id: task-409-419-gen3-event-inventory-extraction-parser-qa
type: TASK
title: Gen 3 Event Inventory Items Extraction Parser QA
status: COMPLETED
owner_persona: qa
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on:
  - task-409-418-gen3-event-inventory-extraction-parser-impl
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

# Gen 3 Event Inventory Items Extraction Parser QA

## Overview
Verify the Coder's implementation of the Gen 3 event inventory item extraction binary parsing logic.

## Requirements
- Verify that the Coder correctly implements the parsing logic to extract `0x0113` Eon Ticket, `0x0172` Mystic Ticket, `0x0173` Aurora Ticket, and `0x0174` Old Sea Map from the Bag.
- Validate that the implementation strictly adheres to the Save File Parsing & Extraction Guidelines (Section 13 of `.foundry/docs/schema.md`).
  - No magic numbers.
  - Module-level constants for all memory offsets, lengths, and bitwise maps.
  - Gen 3 relative offsets are used instead of hardcoded absolute offsets.
  - `RangeError` is explicitly caught and re-thrown with the correct message: "The save file is corrupted or incomplete."
- Verify that unit tests comprehensively cover the new parsing logic.

## Acceptance Criteria
- [x] Code has been reviewed for functional correctness against Gen 3 save files.
- [x] Code strict architectural adherence is confirmed.
- [x] Tests pass and provide adequate coverage.
