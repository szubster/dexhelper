---
id: task-575-690-archival-tree-e2e-harness
type: TASK
title: Archival Tree Evaluation E2E Test Harness
status: ACTIVE
owner_persona: coder
created_at: '2026-10-16T21:02:21.588Z'
updated_at: '2026-10-22'
depends_on:
  - task-573-603-tree-level-completeness-qa
  - task-574-659-archival-file-move-automation-qa
jules_session_id: '11257128335997298866'
pr_number: null
parent: story-550-575-archival-tree-evaluation-e2e
tags:
  - foundry
  - infrastructure
  - orchestrator
  - e2e
  - test-harness
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Archival Tree Evaluation E2E Test Harness

## Objective
Set up the Playwright test harness and mock directory structure for orchestrator archival E2E verification.

## Acceptance Criteria
- [x]  Create test setup/teardown logic for temporary \`.foundry\` directory
- [x]  Implement utility to mock active and verifying nodes
- [x]  Verify test harness cleans up temp files via \`afterEach\` hooks
