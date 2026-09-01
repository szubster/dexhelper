---
id: task-473-495-qa-ribbon-constants
type: TASK
title: QA Gen 3 Ribbon Constants
status: ACTIVE
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-09-01'
depends_on:
  - task-473-494-ribbon-constants-tests
jules_session_id: '18215210802869179727'
pr_number: null
parent: story-133-473-gen3-ribbon-constants
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Gen 3 Ribbon Constants

## Objective
Verify the Gen 3 Ribbon constants implementation and unit tests against .foundry/docs/schema.md Section 13 constraints.

## Acceptance Criteria
- [ ] Verify constants are defined at the module level in src/engine/saveParser/parsers/gen3.ts and no magic numbers are used.
- [ ] Verify unit tests pass and adequately cover the new constants.
