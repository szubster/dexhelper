---
id: story-081-288-gen3-mix-record-inherited-events
type: STORY
title: Extract Gen 3 Mix Record Inherited Events
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-047-081-gen3-tv-swarm-data-extraction
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Extract Gen 3 Mix Record Inherited Events

## Description
Based on requirement 2.2, we must accurately extract data indicating if events were inherited from another player's save file via the "Mix Record" feature. This goes beyond just extracting flags (as done in `story-081-124-gen3-event-forecast-schedule`) and involves mapping the full inherited event data correctly.

## Acceptance Criteria
- [x] Implement extraction logic to parse inherited events data from Mix Records.
- [x] task-288-304-gen3-mix-record-inherited-events-impl
- [x] task-288-305-gen3-mix-record-inherited-events-qa
