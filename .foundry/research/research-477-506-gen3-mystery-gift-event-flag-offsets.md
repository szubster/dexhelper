---
id: research-477-506-gen3-mystery-gift-event-flag-offsets
type: RESEARCH
title: Gen 3 Mystery Gift Event Flag Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-31'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '215371562296801208'
pr_number: null
parent: story-345-477-gen3-mystery-gift-event-flags
tags:
  - gen3
  - mystery-gift
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Mystery Gift Event Flag Offsets

## Context
This research node was created to find the exact bit indices and memory offsets for the Mystery Gift event flags (such as the Aurora Ticket and MysticTicket) in Generation 3 save files. The base offset for event flags in `SaveBlock1` is `0x1270`, but the specific bits to check for these events are unknown.

## Acceptance Criteria
- [x] Investigate and determine the exact event flag bit indices/offsets for Gen 3 Mystery Gift flags (e.g. Aurora Ticket, MysticTicket).
- [x] Document the findings in a knowledge base document in `.foundry/docs/knowledge_base/`.
