---
id: story-048-086-implement-implicit-dependency-check
type: STORY
title: Implement Implicit Dependency Check in Orchestrator
status: PENDING
owner_persona: tech_lead
created_at: '2026-05-28'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-035-048-implicit-dependency-enforcement
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
