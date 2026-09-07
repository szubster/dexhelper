---
id: task-520-539-refactor-gen3-world-event-parsers
type: TASK
title: Refactor Gen 3 World Event Parsers
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-523-520-gen3-parsers-refactor-core
tags:
  - refactor
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: Refactor Gen 3 World Event Parsers

## Context
Refactor Gen 3 World Event parsers to comply with ADR 028 by replacing inline magic numbers with explicitly defined module-level constants and implementing relative offsets.

## Acceptance Criteria
- [ ] Extract magic numbers into module-level constants for parseGen3RoamerStruct, parseGen3Roamer, parseGen3TVBlock, parseGen3MixRecords, parseGen3VolcanicAsh, parseGen3ActiveSwarm, parseGen3MirageIslandValue, parseGen3SecretBases, parseGen3TrainerId, and parseGen3ContestMaster functions
- [ ] Implement relative offsets using the resolved section offset for these functions
