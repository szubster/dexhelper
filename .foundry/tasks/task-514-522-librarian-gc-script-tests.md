---
id: task-514-522-librarian-gc-script-tests
type: TASK
title: Tests for Librarian Garbage Collection Script
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on:
  - task-514-521-librarian-gc-script-impl
jules_session_id: null
pr_number: null
parent: story-410-514-librarian-garbage-collection-script
tags:
  - foundry
  - github-scripts
  - testing
  - librarian
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Tests for Librarian Garbage Collection Script

## Objective
Write comprehensive unit and integration tests for the librarian garbage collection script.

## Acceptance Criteria
- [ ] Implement unit tests for the journal eligibility checking logic (mocking file stats/contents).
- [ ] Implement integration tests for the sweep script, verifying correct deletion of mock stale files while preserving active ones.
- [ ] Ensure edge cases like missing directories or permission errors are handled and tested.
