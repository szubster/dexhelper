---
id: story-531-649-priority-orchestrator-dispatch-impl
type: STORY
title: Priority-Based Dispatch in Orchestrator Implementation
status: READY
owner_persona: tech_lead
created_at: '2026-10-13'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-518-531-priority-orchestrator-dispatch
tags:
  - orchestrator
  - scheduling
  - logic
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Priority-Based Dispatch in Orchestrator Implementation

## Context
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`.

## Acceptance Criteria
- [x] Tech Lead: Decompose this story into implementation and QA TASK nodes.
- [x] task-649-702-priority-dispatch-coder
- [x] task-649-703-priority-dispatch-tests-coder
- [x] task-649-704-priority-dispatch-qa
- [ ] research-649-726-investigate-priority-dispatch-failure
- [ ] task-649-727-priority-dispatch-coder-retry
- [ ] task-649-728-priority-dispatch-tests-coder-retry
- [ ] task-649-729-priority-dispatch-qa-retry
