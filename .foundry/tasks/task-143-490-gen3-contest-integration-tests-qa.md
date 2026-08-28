---
id: task-143-490-gen3-contest-integration-tests-qa
type: TASK
title: Gen 3 Contest Integration Tests QA
status: READY
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-08-28'
depends_on:
  - task-143-489-gen3-contest-integration-tests-impl
jules_session_id: null
pr_number: null
parent: story-065-143-gen3-contest-integration-tests
tags:
  - tests
  - gen3
  - contests
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# TASK: Gen 3 Contest Integration Tests QA

## 1. Context
This task verifies that the Gen 3 contest integration tests successfully validate the extraction and mapping of contest data to PokemonInstance objects.

## 2. Requirements
- Verify that the implemented integration tests cover the extraction and mapping of Conditions, Sheen, and Ribbons.
- Ensure all relevant Gen 3 test suites pass.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to status: FAILED with a rejection_reason.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to status: CANCELLED with a rejection_reason.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Verify Gen 3 contest integration tests run successfully and provide adequate coverage.
