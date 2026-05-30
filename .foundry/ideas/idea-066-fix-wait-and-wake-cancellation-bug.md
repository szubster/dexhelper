---
id: idea-066-fix-wait-and-wake-cancellation-bug
type: IDEA
title: Fix Wait and Wake Cancellation Bug
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-28'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - orchestrator
  - auto-cancel
  - bug
research_references: []
rejection_count: 0
rejection_reason: ''
notes: >-
  Created autonomously by agile_coach to fix an orchestrator bug causing
  COMPLETED nodes to be incorrectly cancelled.
---

# Fix Wait and Wake Cancellation Bug

## Context
The `Implement DAG Dependency Cancellation Logic` task (`.foundry/tasks/task-072-128-implement-dag-cancellation.md`) was rejected 2 times with a `rejection_reason` explaining a severe bug in the orchestrator: `Implementation modifies immutable COMPLETED nodes to PENDING during Wait and Wake, causing them to be incorrectly swept up by cascade cancellation logic.`

Looking at `foundry-orchestrator.ts`, the Phase 3.5 Wait and Wake loop checks all `ACTIVE` and `VERIFYING` nodes to see if they should be suspended. However, `COMPLETED` nodes should be immutable.

## Proposal
Fix the `Wait and Wake` logic so that `COMPLETED` nodes are not mutated.

## Next Steps
- [ ] Product Manager: Evaluate this idea, determine the best technical approach, and convert it to a PRD.
