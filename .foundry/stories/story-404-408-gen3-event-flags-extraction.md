---
id: story-404-408-gen3-event-flags-extraction
type: STORY
title: Gen 3 Event Flags Extraction Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-08'
updated_at: '2026-08-12'
depends_on:
  - research-408-415-gen3-event-flags-bit-indices
jules_session_id: null
pr_number: null
parent: epic-121-404-gen3-e-reader-event-data-extraction
tags:
  - gen3
  - extraction
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 3 Event Flags Extraction Logic

## Overview
Implement the extraction of specific event flags from Gen 3 save files to detect the presence of hardware and Mystery Gift events.

## Requirements
- Extract event flags: `FLAG_SYS_EON_TICKET_ENABLE`, `FLAG_ENABLE_MYSTERY_GIFT`, `FLAG_RECEIVED_AURORA_TICKET`.
- Provide a clean data interface for the UI dashboard.
- Adhere to Save File Parsing & Extraction Guidelines: use module-level constants, avoid magic numbers, use relative offsets, and catch `RangeError` for out-of-bounds reads.

## Acceptance Criteria
- [ ] Break down into TASK nodes for flag extraction and testing.
