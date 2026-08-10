---
id: research-408-415-gen3-event-flags-bit-indices
type: RESEARCH
title: Research Gen 3 Event Flags Bit Indices
status: READY
owner_persona: researcher
created_at: '2026-08-10'
updated_at: '2026-08-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-404-408-gen3-event-flags-extraction
tags:
  - gen3
  - extraction
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research Gen 3 Event Flags Bit Indices

## Overview
Investigate and determine the exact bit indices for specific event flags in Gen 3 save files to enable data extraction.

## Context
As defined in `.foundry/stories/story-404-408-gen3-event-flags-extraction.md`, we need to parse specific event flags: `FLAG_SYS_EON_TICKET_ENABLE`, `FLAG_ENABLE_MYSTERY_GIFT`, and `FLAG_RECEIVED_AURORA_TICKET`. We know the base offset for `SaveBlock1` event flags is `0x1270`, but we are missing the exact bit index or offset for these specific flags.
Without the exact bit indices, the implementation tasks cannot be formulated properly.

## Requirements
- Research and document the exact bit indices or offsets (relative to the base event flags offset) for:
  - `FLAG_SYS_EON_TICKET_ENABLE`
  - `FLAG_ENABLE_MYSTERY_GIFT`
  - `FLAG_RECEIVED_AURORA_TICKET`
- Create or update a document in `.foundry/docs/knowledge_base/` with these values.

## Acceptance Criteria
- [ ] Determine the exact bit indices/offsets for the specified flags.
- [ ] Document the findings in `.foundry/docs/knowledge_base/`.
