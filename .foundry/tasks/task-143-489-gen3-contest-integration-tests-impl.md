---
id: task-143-489-gen3-contest-integration-tests-impl
type: TASK
title: Gen 3 Contest Integration Tests Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '10178426906540761194'
pr_number: null
parent: story-065-143-gen3-contest-integration-tests
tags:
  - tests
  - gen3
  - contests
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# TASK: Gen 3 Contest Integration Tests Implementation

## 1. Context
This task implements integration tests in the save parser suite that validate full Gen 3 save files correctly map contest data (Conditions, Sheen, Ribbons) to PokemonInstance objects.

## 2. Requirements
- Write integration tests confirming the parsing engine successfully processes full Gen 3 save files and maps contest data correctly.
- Verify both successful parsing and correct extraction mapping for contest stats.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to status: FAILED with a rejection_reason.
- If you must abort or permanently fail a task, you MUST update the YAML frontmatter to status: CANCELLED with a rejection_reason.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [x] Implement Gen 3 Contest Integration Tests.
