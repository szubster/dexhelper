---
id: research-124-171-investigate-gen3-event-schedule-offsets
type: RESEARCH
title: Investigate Gen 3 Event Schedule Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: '14040143309139528579'
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
- Identify the memory location of the TV broadcast data block.
- Document the structure of the upcoming event schedule.
- Determine how to parse Mix Record flags to identify inherited events.

## Deliverables
- Update the Knowledge Base with the discovered offsets and structures.
- Ensure the information is sufficient to unblock `task-124-171-gen3-event-schedule-parser` and `task-124-172-gen3-mix-record-events-parser`.
