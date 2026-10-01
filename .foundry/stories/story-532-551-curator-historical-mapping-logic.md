---
id: story-532-551-curator-historical-mapping-logic
type: STORY
title: Curator Logic for Historical Idea Mappings
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-09-05'
updated_at: '2026-10-01'
depends_on: []
jules_session_id: null
parent: epic-518-532-historical-backtracking
tags:
  - architecture
  - quality
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Curator Logic for Historical Idea Mappings

## Summary
Implement the logic that allows the holistic code curator to read and process the idea dependency matrix and spawn remediation nodes when needed.

## Requirements
- Enhance the curator prompt/logic to explicitly cross-reference the `idea_dependency_matrix.md`.
- Implement mechanisms for the curator to identify regressions based on overlapping domain boundaries.
- Provide the curator with the ability to dynamically spawn remediation nodes (e.g., RESEARCH or TASK) linked to legacy ideas.

## Acceptance Criteria
- [x] Create tasks to update curator logic
- [x] Create tasks to test historical mapping ingestion
- [x] Create tasks to test dynamic remediation node spawning
- [x] task-551-562-update-curator-prompt-logic
- [x] task-551-563-qa-update-curator-prompt-logic
- [x] task-551-564-test-curator-historical-mapping-ingestion
- [x] task-551-565-test-curator-dynamic-remediation-spawning
- [x] task-551-566-qa-test-curator-historical-mapping
