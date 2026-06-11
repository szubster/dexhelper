---
id: story-071-110-verify-core-documentation
type: STORY
title: Verify core documentation for conflicting statements
status: PENDING
owner_persona: tech_lead
created_at: "2026-06-10"
updated_at: "2026-06-10"
depends_on:
  - story-071-108-update-schema-macro-node-completion
  - story-071-109-update-adr001-macro-node-completion
jules_session_id: null
pr_number: null
parent: epic-045-071-documentation-macro-node-completion
tags:
  - orchestrator
  - documentation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Verify core documentation for conflicting statements

## Context
With the introduction of strict hierarchical completion in the orchestrator, where macro nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) cannot complete until all descendant nodes are `COMPLETED`, our system documentation needs to reflect these new constraints.

## Objective
Verify that there are no conflicting statements across other core documentation regarding the new macro node completion rules. Update any other relevant documents if necessary (e.g. `core_policies.md`).

## Requirements
Verify that there are no conflicting statements across other core documentation.

## Acceptance Criteria
- [ ] Verify that there are no conflicting statements across other core documentation.
