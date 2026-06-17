---
id: research-124-171-investigate-gen3-event-schedule-offsets
type: RESEARCH
title: Investigate Gen 3 Event Schedule Offsets
status: READY
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-124-171-gen3-event-schedule-parser
tags:
  - research
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Event Schedule Offsets

## Description
Investigate and document the memory offsets and data structures for extracting the upcoming event schedule (e.g., Energy Guru sales) and Mix Record events from Gen 3 save files.

## Goals
- [x] Identify the memory location of the TV broadcast data block.
- [x] Document the structure of the upcoming event schedule.
- [x] Determine how to parse Mix Record flags to identify inherited events.

## Deliverables
- [x] Update the Knowledge Base with the discovered offsets and structures.
- [x] Ensure the information is sufficient to unblock `task-124-171-gen3-event-schedule-parser` and `task-124-172-gen3-mix-record-events-parser`.

### Discoveries

* The `PokeNews` array stores upcoming events (Energy Guru, Lilycove Dept Store) at offset `0x2B50` in `SaveBlock1`.
* The `TVShow` array stores Mix Record events and broadcasts at offset `0x27CC` in `SaveBlock1`.
* A new knowledge base document was created at `.foundry/docs/knowledge_base/gen3_tv_shows_and_events.md`.
