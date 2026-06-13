---
id: story-081-122-gen3-rtc-extraction
type: STORY
title: Extract Gen 3 RTC Data
status: READY
owner_persona: tech_lead
created_at: '2026-06-12'
updated_at: '2026-06-13'
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

# Story: Extract Gen 3 RTC Data

## Description
Extract and parse the Real-Time Clock (RTC) value from Gen 3 save files to allow for time-gated event mapping.

## Acceptance Criteria
- [ ] Implement parser logic to extract the RTC value from the save.
- [ ] Provide utility functions to format/interpret the RTC data against current active events.

## Child Nodes
- [ ] task-122-171-gen3-rtc-extraction-impl
- [ ] task-122-172-gen3-rtc-extraction-qa
