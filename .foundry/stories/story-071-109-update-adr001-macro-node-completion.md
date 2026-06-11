---
id: story-071-109-update-adr001-macro-node-completion
type: STORY
title: Update ADR 001 with strict macro node completion rules
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-10'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '6816560503344240337'
pr_number: null
parent: epic-045-071-documentation-macro-node-completion
tags:
  - orchestrator
  - adr
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update ADR 001 with strict macro node completion rules

## Context
With the introduction of strict hierarchical completion in the orchestrator, where macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`, our system documentation needs to reflect these new constraints.

## Objective
Update `.foundry/docs/adrs/001-the-foundry-architecture.md` to detail the new macro node completion rules so that all personas are aware of the expected behavior and how to properly format parent-child relationships to comply.

## Requirements
Update `.foundry/docs/adrs/001-the-foundry-architecture.md` (ADR 001) to reflect the strict completion checks.

## Acceptance Criteria
- [ ] Update `001-the-foundry-architecture.md` (ADR 001) to detail the behavior.

## Tasks
- [ ] task-109-161-update-adr001-macro-node-completion-impl
