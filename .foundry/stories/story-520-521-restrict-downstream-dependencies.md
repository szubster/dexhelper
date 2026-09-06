---
id: story-520-521-restrict-downstream-dependencies
type: STORY
title: "Restrict Downstream Dependencies on DRAFT/WIP Artifacts"
status: PENDING
owner_persona: tech_lead
created_at: "2026-09-03"
updated_at: "2026-09-03"
depends_on:
  - story-520-520-update-persona-prompts
jules_session_id: null
locks: []
pr_number: null
parent: epic-346-520-wip-orchestrator-awareness
tags:
  - foundry
  - orchestrator
  - wip
research_references: []
experiment_variants: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Restrict Downstream Dependencies on DRAFT/WIP Artifacts

## Description
Implement rules and constraints in the Foundry orchestrator and prompt layers to strictly prevent agents from taking downstream dependencies on any artifact marked as Draft or WIP until it is formally promoted.

## Acceptance Criteria
- [ ] Implement constraints preventing agents from depending on DRAFT and WIP artifacts.
- [ ] Add tests or orchestrator safeguards to enforce this restriction.
- [ ] Decompose into actionable TASK nodes.
