---
id: story-520-522-wip-awareness-e2e
type: STORY
title: WIP Orchestrator Awareness E2E Verification
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-10-22'
depends_on:
  - story-520-521-restrict-downstream-dependencies
jules_session_id: null
pr_number: null
parent: epic-346-520-wip-orchestrator-awareness
tags:
  - foundry
  - orchestrator
  - wip
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# WIP Orchestrator Awareness E2E Verification

## Description
Perform end-to-end verification of the orchestrator and agent awareness regarding WIP and Draft artifacts, ensuring all constraints and prompt updates are working correctly together.

## Acceptance Criteria
- [ ] Write E2E tests validating that agents avoid depending on Draft/WIP artifacts.
- [ ] Verify that the orchestrator respects the new WIP-awareness constraints.
- [x] Decompose into actionable TASK nodes.
- [ ] task-522-683-wip-awareness-e2e-fixtures
- [ ] task-522-684-wip-awareness-e2e-agent-tests
- [x] task-522-685-wip-awareness-e2e-orchestrator-tests
- [x] task-522-686-wip-awareness-e2e-qa
- [ ] research-522-712-investigate-orchestrator-wip-tests-failure
- [ ] task-522-713-wip-awareness-e2e-orchestrator-tests-retry
- [ ] task-522-714-wip-awareness-e2e-qa-retry
