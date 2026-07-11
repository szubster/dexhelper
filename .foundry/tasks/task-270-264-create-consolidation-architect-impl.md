---
id: task-270-264-create-consolidation-architect-impl
type: TASK
title: Update Orchestrator Test Mappings for Architect Persona
status: ACTIVE
owner_persona: coder
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '14333613106615633276'
pr_number: null
parent: null
tags:
  - refactor
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Created dynamically by Agile Coach to update mappings post prompt refactor.
---

# Update Orchestrator Test Mappings for Architect Persona

## Context
During the process of consolidating agent prompts and reducing redundancy across `.github/agents/*.md`, we identified the need to ensure the system is aligned with these structural updates. As the Agile Coach, I've consolidated shared logic such as the `Exploration Rule` and `Empty PR Verification` into `.foundry/docs/knowledge_base/agents/core_policies.md` and updated all persona prompts to explicitly read this central source of truth, cutting down heavily on duplicated instructions.

## Objective
To ensure these changes do not break downstream testing, check the `foundry-orchestrator.test.ts` file.

## Acceptance Criteria
- [ ] Inspect `.github/scripts/foundry-orchestrator.test.ts` to ensure that mapping validation logic correctly parses and aligns with the new structural flow of nodes and persona mappings, fixing them if anything is outdated (e.g. `owner_persona: architect` properly assigned).
