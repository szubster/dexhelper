---
id: story-119-261-npc-trade-state-integration
type: STORY
title: NPC Trade State Integration
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-03'
updated_at: '2026-08-01'
depends_on:
  - story-119-260-npc-trade-data-mapping
jules_session_id: '2271137122973644447'
pr_number: null
parent: epic-095-119-in-game-trade-data-extraction
tags:
  - backend
  - state-integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: NPC Trade State Integration

## Objective
Integrate the extracted flags into the unified `SaveData` object, ensuring consistency and proper `RangeError` handling.

## Acceptance Criteria
- [x] Tech Lead: Break down into tasks for `SaveData` update and test coverage.
- [x] task-261-331-npc-trade-state-integration-impl
- [x] task-261-332-npc-trade-state-integration-qa
- [ ] research-261-357-investigate-npc-trade-state-integration-failure
- [ ] task-261-358-npc-trade-state-integration-retry-impl
- [ ] task-261-359-npc-trade-state-integration-retry-qa
