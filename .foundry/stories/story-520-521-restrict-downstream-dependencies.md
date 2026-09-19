---
id: story-520-521-restrict-downstream-dependencies
type: STORY
title: Restrict Downstream Dependencies on DRAFT/WIP Artifacts
status: READY
owner_persona: tech_lead
created_at: '2026-09-03'
updated_at: '2026-09-19'
depends_on:
  - story-520-520-update-persona-prompts
jules_session_id: null
pr_number: null
parent: epic-346-520-wip-orchestrator-awareness
tags:
  - foundry
  - orchestrator
  - wip
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Restrict Downstream Dependencies on DRAFT/WIP Artifacts

## Description
Implement rules and constraints in the Foundry orchestrator and prompt layers to strictly prevent agents from taking downstream dependencies on any artifact marked as Draft or WIP until it is formally promoted.

## Acceptance Criteria
- [x] Implement constraints preventing agents from depending on DRAFT and WIP artifacts.
- [x] Add tests or orchestrator safeguards to enforce this restriction.
- [x] Decompose into actionable TASK nodes.
- [ ] task-521-578-restrict-wip-dependencies-impl
- [ ] task-521-579-restrict-wip-dependencies-qa
