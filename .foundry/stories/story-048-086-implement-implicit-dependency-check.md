---
id: story-048-086-implement-implicit-dependency-check
type: STORY
title: Implement Implicit Dependency Check in Orchestrator
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-28'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-035-048-implicit-dependency-enforcement
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Implicit Dependency Check in Orchestrator

## Context
We need to enforce implicit dependencies for macroscopic nodes like EPIC and STORY nodes so they cannot transition to VERIFYING (or COMPLETED) prematurely.

## Acceptance Criteria
- [x] Update `isHierarchicallyIncomplete` or node resolution logic in `foundry-orchestrator.ts` to ensure that a parent node isn't ready if its descendant tree has any nodes not in the COMPLETED state.

## Implementation Tasks
- `.foundry/archive/tasks/task-086-146-impl-implicit-dependency-check.md`
- `.foundry/tasks/task-086-147-qa-implicit-dependency-check.md`
