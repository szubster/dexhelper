---
id: task-566-583-orchestrator-diagnosis-tests
type: TASK
title: Write Unit Tests for BLOCKED Diagnosis Generation
status: READY
owner_persona: coder
created_at: '2026-09-15T23:11:43Z'
updated_at: '2026-09-15T23:11:43Z'
depends_on:
  - task-566-582-orchestrator-diagnosis-logic
jules_session_id: null
pr_number: null
parent: story-552-566-orchestrator-diagnosis-artifact
tags:
  - foundry
  - orchestrator
  - dag
  - tests
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Write Unit Tests for BLOCKED Diagnosis Generation

## Description
Implement unit tests in `.github/scripts/foundry-orchestrator.test.ts` to verify the orchestrator's ability to correctly identify BLOCKED nodes (circular dependencies and unresolvable paths) and output the exact expected diagnosis artifact.

## Acceptance Criteria
- [ ] Add tests for circular dependency detection and artifact generation.
- [ ] Add tests for unresolvable node paths.
