---
id: research-105-196-gen3-roamer-event-flag
type: RESEARCH
title: Investigate Gen 3 Roamer Event Flag Offset
status: READY
owner_persona: researcher
created_at: '2026-06-17'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-067-105-gen3-roamer-parser-implementation
tags:
  - gen3
  - roamer
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer Event Flag Offset

## Objective
Discover the exact memory offset and bit mask for the event flag that indicates whether the roamer has been released in Gen 3 saves (Ruby/Sapphire/Emerald).

## Context
During the drafting of blueprints for `story-067-105-gen3-roamer-parser-implementation`, it was noted that the roamer should only be considered "active" if the corresponding event flag indicating it has been released is set in the save file. We need to identify this specific flag.

## Acceptance Criteria
- [x] Determine the exact memory offset and bit mask for the roamer released event flag in Gen 3 saves.
