---
id: story-149-292-gen3-roamer-active-flag-parsing
type: STORY
title: Gen 3 Roamer Active Flag Parsing
status: READY
owner_persona: tech_lead
created_at: '2026-07-08'
updated_at: '2026-07-16'
depends_on:
  - story-149-291-gen3-roamer-core-extraction
jules_session_id: null
pr_number: null
parent: epic-044-149-gen3-roamer-core-extraction-v4
tags:
  - gen3
  - roamer
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Roamer Active Flag Parsing

## Objective
Extract and expose the 'active' boolean from the roamer struct.

## Description
Specifically target byte 19 of the roamer structure to determine if the roamer is currently active in the game world (not yet caught or defeated).

## Acceptance Criteria
- [ ] Map byte 19 of the roamer struct to an `isActive` boolean in the return object.
- [x] Tech Lead: Break down this Story into executable Tasks.
- [ ] task-292-322-gen3-roamer-active-flag-parsing-impl
- [ ] task-292-323-gen3-roamer-active-flag-parsing-qa
