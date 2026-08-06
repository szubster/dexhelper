---
id: task-356-396-circular-dependency-e2e-impl
type: TASK
title: Circular Dependency Detection E2E Implementation
status: READY
owner_persona: coder
created_at: '2026-08-04'
updated_at: '2026-08-06'
depends_on:
  - story-338-336-implement-orchestrator-cycle-detection
jules_session_id: null
pr_number: null
parent: story-338-356-circular-dependency-detection-e2e
tags:
  - e2e
  - integration
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Circular Dependency Detection E2E Implementation

## Goal
Implement E2E test cases to verify the circular dependency detection feature in the DAG orchestrator. This task creates the actual test scripts and ensures they correctly identify cycles.

## Acceptance Criteria
- [ ] Implement E2E tests for circular dependency detection in `.github/scripts/foundry-orchestrator.test.ts`.
- [ ] Ensure tests cover scenarios such as direct circular references (A -> B -> A).
- [ ] Ensure tests cover indirect circular references (A -> B -> C -> A).
- [ ] Validate that the orchestrator rejects PRs or fails safely when a cycle is detected.
