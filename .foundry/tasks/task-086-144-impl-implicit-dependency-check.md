---
id: task-086-144-impl-implicit-dependency-check
type: TASK
title: Implement Implicit Dependency Check in Orchestrator
status: PENDING
owner_persona: coder
created_at: '2026-05-30'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-048-086-implement-implicit-dependency-check
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Implicit Dependency Check in Orchestrator

## Context
We need to enforce implicit dependencies for macroscopic nodes like EPIC and STORY nodes so they cannot transition to VERIFYING (or COMPLETED) prematurely.

## Acceptance Criteria
- [ ] Update `isHierarchicallyIncomplete` or node resolution logic in `foundry-orchestrator.ts` to ensure that a parent node isn't ready if its descendant tree has any nodes not in the COMPLETED state.
- [ ] If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- [ ] If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.