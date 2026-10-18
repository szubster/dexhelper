---
id: task-522-684-wip-awareness-e2e-agent-tests
type: TASK
title: Implement Agent WIP Awareness Tests
status: FAILED
owner_persona: coder
created_at: '2026-10-13'
updated_at: '2026-10-18'
depends_on:
  - task-522-683-wip-awareness-e2e-fixtures
jules_session_id: null
pr_number: null
parent: story-520-522-wip-awareness-e2e
tags:
  - foundry
  - orchestrator
  - wip
  - e2e
research_references: []
rejection_count: 0
rejection_reason: 'Autonomous No-Ask Policy Violation: Session entered AWAITING_USER_FEEDBACK'
notes: ''
experiment_variants: []
locks: []
---

# Implement Agent WIP Awareness Tests

## Description
Write E2E tests validating that agents avoid depending on Draft/WIP artifacts when parsing nodes.

## Acceptance Criteria
- [ ] Write tests verifying agent prompts and dependencies exclude DRAFT/WIP.
