---
id: task-142-250-gen3-contest-data-mapping-qa
type: TASK
title: QA Gen 3 Contest Data Mapping
status: COMPLETED
owner_persona: qa
created_at: '2026-07-02'
updated_at: '2026-09-03'
depends_on:
  - task-142-249-gen3-contest-data-mapping-impl
jules_session_id: null
pr_number: null
parent: story-065-142-gen3-contest-data-mapping
tags:
  - qa
  - gen3
  - contests
  - mapping
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: QA Gen 3 Contest Data Mapping

## 1. Context
This task verifies that the mapping of Gen 3 contest data to the `PokemonInstance` structure was implemented correctly and maintains backward compatibility.

## 2. Requirements
- Verify that Gen 3 `partyDetails` and `pcDetails` in the parsed output contain the correct `condition` and `ribbons` properties.
- Confirm all existing Gen 1 and Gen 2 save parsing tests pass without modification.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [x] Verify Gen 3 contest data is successfully parsed and attached to `PokemonInstance` structures in unit and/or integration tests.
- [x] Verify that Gen 1 and Gen 2 test suites continue to pass without issues.
