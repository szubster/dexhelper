---
id: task-563-602-gen2-roamer-translation-implementation
type: TASK
title: Gen 2 Roamer Translation Implementation
status: READY
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-140-563-gen2-roamer-translation-logic
tags:
  - gen2
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 2 Roamer Translation Implementation

## Objective
Implement the logic to consume raw mapGroup and mapId values and output translated human-readable names with appropriate fallback handling.

## Description
- Utilize the mapping structure defined in the prerequisite story.
- Implement a robust function to process the raw roamer coordinates.
- Ensure proper fallback logic returning 'Unknown Location' if the coordinate pair is not found or is invalid.

## Acceptance Criteria
- [ ] Translation function successfully maps valid mapGroup and mapId to route names.
- [ ] Fallback string 'Unknown Location' is returned for invalid or unmapped coordinates.
