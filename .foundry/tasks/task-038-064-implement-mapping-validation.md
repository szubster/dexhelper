---
id: task-038-064-implement-mapping-validation
type: TASK
title: Implement Mapping Validation
status: ACTIVE
owner_persona: coder
created_at: '2026-05-04'
updated_at: '2026-05-05'
depends_on: []
jules_session_id: '10794641506921021617'
pr_number: null
parent: .foundry/stories/story-025-038-implement-mapping-validation.md
tags:
  - orchestrator
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Implement Mapping Validation in DAG Orchestrator

## Requirements
- Implement validation logic in `.github/scripts/foundry-orchestrator.ts` Phase 4 or 4.5.
- Nodes are validated before dispatch (not transitioned to READY).
- The check matches node `type` and `owner_persona`.
- The mapping must enforce:
  - `IDEA` -> `product_manager`
  - `PRD` -> `epic_planner`
  - `EPIC` -> `story_owner`
  - `STORY` -> `tech_lead`
  - `TASK` -> `coder` or `qa`
- Exempt the `human` persona from validation constraints.

## Acceptance Criteria
- [ ] Logic implemented as described.
- [ ] Unit tests cover new conditions.
