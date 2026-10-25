---
id: story-587-708-integrate-validator-with-orchestrator
type: STORY
title: Integrate Validator with Orchestrator
status: PENDING
owner_persona: tech_lead
created_at: '2026-10-18T18:43:00Z'
updated_at: '2026-10-22'
depends_on:
  - story-587-707-implement-validator-core-logic
jules_session_id: null
pr_number: null
parent: epic-585-587-implement-macro-node-subtree-completeness-validator
tags:
  - foundry
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Integrate Validator with Orchestrator

## Description
This story integrates the core completeness validation logic into the Foundry Orchestrator. The orchestrator must execute this validation before allowing any parent node to transition to `VERIFYING` or `READY`.

## Acceptance Criteria
- [ ] Integrate the core validation function into the orchestrator's node transition pipeline.
- [ ] Prevent macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) from transitioning to `VERIFYING` if any descendant is not `COMPLETED`.
- [ ] Ensure appropriate logging or error messages are generated when validation fails.
