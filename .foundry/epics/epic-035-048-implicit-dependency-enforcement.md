---
id: epic-035-048-implicit-dependency-enforcement
type: EPIC
title: Enforce Implicit Dependency in Orchestrator
status: PENDING
owner_persona: story_owner
created_at: '2026-05-24'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-065-035-epic-verification-timing
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Implicit Dependency in Orchestrator

## Context
Currently, macroscopic Foundry nodes like `EPIC` and `STORY` nodes can transition to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely. Because the orchestrator treats these as standalone completions, it creates a false sense of progress.

## Goal
Update the `foundry-orchestrator.ts` to enforce implicit dependency. A node cannot be considered `READY` (and thereby cannot transition to `COMPLETED`) if any node in its descendant tree is in any state other than `COMPLETED`.

## Acceptance Criteria
- [x] Create STORY nodes to implement the implicit dependency enforcement in `foundry-orchestrator.ts`.
- [x] Ensure unit tests in `.github/scripts/foundry-orchestrator.test.ts` are updated or added.

### Implementation Stories
- [.foundry/stories/story-048-086-implement-implicit-dependency-check.md](.foundry/stories/story-048-086-implement-implicit-dependency-check.md)
- [.foundry/stories/story-048-087-update-orchestrator-tests.md](.foundry/stories/story-048-087-update-orchestrator-tests.md)
