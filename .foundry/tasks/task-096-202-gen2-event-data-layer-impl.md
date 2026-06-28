---
id: task-096-202-gen2-event-data-layer-impl
type: TASK
title: Gen 2 Event Data Layer - Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-06-17'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: '13640924539527659036'
pr_number: null
parent: story-061-096-gen2-event-data-layer
tags:
  - gen2
  - frontend
  - data-layer
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Gen 2 Event Data Layer - Implementation

## Blueprint
As requested in `story-061-096-gen2-event-data-layer`, you are to expose the extracted event flags from the Gen 2 save file to the frontend UI components via the data layer.
- `STATIC_GIFT_DATA` in `src/engine/data/gen2/assistantData.ts` currently lacks `eventFlag` definitions for the static gifts (e.g., Togepi, Eevee, Shuckle, Dratini, Tyrogue). You need to add the correct `eventFlag` offsets. You might need to spawn a RESEARCH node if you lack the exact flag offsets.
- Ensure the strategy/generators (like `src/engine/assistant/generators/tradeGenerator.ts` and `src/engine/assistant/strategies/gen2Strategy.ts`) correctly consume these flags to filter out already-claimed gifts for Gen 2.
- Reminders:
  - If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
  - If you submit an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Add `eventFlag` mappings to Gen 2 static gifts and trades.
- [ ] Ensure frontend suggestion generation respects Gen 2 event flags.
- [ ] Add unit tests verifying the data layer integration for Gen 2 event flags.
