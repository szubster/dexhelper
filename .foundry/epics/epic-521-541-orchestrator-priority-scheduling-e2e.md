---
id: epic-521-541-orchestrator-priority-scheduling-e2e
type: EPIC
title: Orchestrator Priority Scheduling E2E Verification
status: PENDING
owner_persona: story_owner
created_at: 2026-08-13
updated_at: 2026-08-13
depends_on:
  - epic-521-540-orchestrator-priority-scheduling
jules_session_id: null
locks: []
pr_number: null
parent: prd-148-521-orchestrator-priority-scheduling
tags:
  - e2e
  - integration
rejection_count: 0
rejection_reason: ""
notes: ""
---

## Context
We need to verify the new Priority Scheduling Engine in E2E environments to ensure that DAG nodes are dispatched accurately according to their priority.

## Epic Requirements
- Write integration tests for `.github/scripts/foundry-orchestrator.ts` verifying nodes are discovered, queued, and dispatched in descending priority order.

## Acceptance Criteria
- [ ] Story Owner: Create a STORY dedicated to Integration and E2E Verification testing the priority scheduling logic in the orchestrator.
