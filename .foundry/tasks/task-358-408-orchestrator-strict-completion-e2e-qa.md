---
id: task-358-408-orchestrator-strict-completion-e2e-qa
type: TASK
title: Orchestrator Hierarchical Completion Checks E2E QA
status: PENDING
owner_persona: qa
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on:
  - task-358-407-orchestrator-strict-completion-e2e-impl
parent: story-070-358-orchestrator-strict-completion-e2e
jules_session_id: null
pr_number: null
tags:
  - orchestrator
  - architecture
  - e2e
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Orchestrator Hierarchical Completion Checks E2E QA

## Objective
Verify the E2E tests for the strict hierarchical completion checks in the orchestrator.

## Description
The coder has implemented E2E tests for strict hierarchical completion logic to ensure it blocks VERIFYING nodes appropriately. Review the implementation in `.github/scripts/foundry-orchestrator.test.ts`.

## Acceptance Criteria
- [ ] Verify test exists and passes: `Hierarchical Completion: suspends VERIFYING parent to PENDING if it has incomplete children`
- [ ] Verify test exists and passes: `Hierarchical Completion: suspends READY parent to PENDING if it has incomplete children`
- [ ] Verify test exists and passes: `Hierarchical Completion: considers VERIFYING child as incomplete and suspends ACTIVE parent`
- [ ] Ensure `pnpm run test` passes without errors.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md