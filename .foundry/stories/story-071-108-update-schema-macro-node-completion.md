---
id: story-071-108-update-schema-macro-node-completion
type: STORY
title: Update schema.md with strict macro node completion rules
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '6612972862173719364'
pr_number: null
parent: epic-045-071-documentation-macro-node-completion
tags:
  - orchestrator
  - schema
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update schema.md with strict macro node completion rules

## Context
With the introduction of strict hierarchical completion in the orchestrator, where macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`, our system documentation needs to reflect these new constraints.

## Objective
Update `.foundry/docs/schema.md` to detail the new macro node completion rules so that all personas are aware of the expected behavior and how to properly format parent-child relationships to comply.

## Requirements
Update `.foundry/docs/schema.md` to explain the new hierarchical completion rules. Ensure it explicitly states that macro nodes cannot complete until all their descendants are fully completed.

## Acceptance Criteria
- [ ] Update `schema.md` with hierarchical completion rules.
