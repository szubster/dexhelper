---
id: story-070-276-orchestrator-verifying-block
type: STORY
title: Orchestrator VERIFYING Hierarchical Block Fix
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-045-070-orchestrator-strict-completion
tags:
  - orchestrator
  - bugfix
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Orchestrator VERIFYING Hierarchical Block Fix

## Context
The orchestrator's `isHierarchicallyIncomplete` properly returns `true` when a node's status is `VERIFYING`. However, in `.github/scripts/foundry-orchestrator.ts`, in the Phase 3.5 (SUSPEND) and Phase 4 (RESOLVE) passes, there are direct conditional checks that explicitly treat `VERIFYING` as a "complete" state for dependencies and parents. This prevents the parent macro node from correctly staying blocked or suspending to `PENDING` when its descendant node reaches `VERIFYING`.

## Objective
Remove the incorrect `VERIFYING` allowances in dependency and parent status checks so that a `VERIFYING` child/dependency correctly blocks or suspends the parent.

## Acceptance Criteria
- [x] .foundry/tasks/task-070-276-001-verifying-block.md
