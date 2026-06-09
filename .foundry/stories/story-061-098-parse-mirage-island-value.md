---
id: story-061-098-parse-mirage-island-value
type: STORY
title: Parse Daily Mirage Island Value
status: READY
owner_persona: tech_lead
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-061-mirage-island-engine
tags:
  - gen3
  - mirage-island
  - rng
research_references: []
notes: ''
rejection_reason: ''
---

# Parse Daily Mirage Island Value

## Context
As defined in Epic `epic-038-061-mirage-island-engine`, the Gen 3 save parser needs to extract the daily Mirage Island random value.

## Requirements
Use the `DataView` API to safely parse the 2-byte daily Mirage Island random value from the Gen 3 save file structure.
Ensure graceful handling of RangeError for corrupted files as per ADR 010.

## Acceptance Criteria
- [ ] Create/Update TASK nodes to implement parsing the Mirage Island value.
