---
id: research-261-357-investigate-npc-trade-state-integration-failure
type: RESEARCH
title: Investigate NPC Trade State Integration Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-29'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-119-261-npc-trade-state-integration
tags:
  - backend
  - state-integration
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate NPC Trade State Integration Failure

## Objective
Investigate the root cause of the permanent failure of `task-261-331-npc-trade-state-integration-impl`. The QA persona noted that tests in `gen3.test.ts` do not verify integration into the `SaveData` object, and the `parseGen3` function incorrectly used `section2Offset` instead of `section1Offset` for Emerald and FRLG.

## Context
See `.foundry/docs/knowledge_base/agents/core_policies.md` and `task-261-332-npc-trade-state-integration-qa` for QA notes.
