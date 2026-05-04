---
id: epic-014-025-enforce-persona-pipeline-handoffs
type: EPIC
title: Enforce Persona Pipeline Handoffs in DAG Orchestrator
status: PENDING
owner_persona: story_owner
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-015-014-enforce-persona-pipeline.md
tags:
  - foundry
  - dag
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Enforce Persona Pipeline Handoffs in DAG Orchestrator

## Overview
This Epic breaks down the work required to introduce a pre-flight schema validation check in the DAG Orchestrator. The orchestrator must ensure that the `owner_persona` defined in a node's YAML frontmatter strictly matches the expected persona for the given node `type` according to the pipeline rules defined in `schema.md`.

## Allowed Type-to-Persona Mappings
The orchestrator must enforce these ownership rules:
- `IDEA` -> `product_manager`
- `PRD` -> `epic_planner`
- `EPIC` -> `story_owner`
- `STORY` -> `tech_lead`
- `TASK` -> `coder` or `qa`
- `human` persona can bypass validation and own any node.

## Architecture & Constraints
- Implement the validation logic within the orchestrator script (`.github/scripts/foundry-orchestrator.ts`) or a dedicated module.
- The check must happen before a node is considered for dispatch or transitioning to `READY`.
- Use `gray-matter` to parse the node frontmatter as mandated by ADR 006.
- Do not dispatch a Jules session if a mismatch is detected; immediately transition to `FAILED` with a descriptive `rejection_reason` or log an error and skip.
- Ensure the `human` persona is a valid owner for ANY node type if manual intervention is specified.

## Prerequisites
- None

## High-Level Acceptance Criteria
- [ ] Orchestrator reads and validates the `owner_persona` against the node `type`.
- [ ] Nodes with incorrect `owner_persona` are blocked from dispatch (e.g., transitioned to `FAILED`).
- [ ] Nodes owned by `human` bypass this validation constraint.
- [ ] Test cases are added to `foundry-orchestrator.test.ts` to verify the validation logic.

## Subsequent Work (Stories)
- [ ] Create Story to implement the mapping validation logic in the orchestrator.
- [ ] Create Story to implement the failure handling and logging for validation mismatches.
- [ ] Create Story to write unit tests covering the validation edge cases.
