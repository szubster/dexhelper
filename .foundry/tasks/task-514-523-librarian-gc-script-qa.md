---
id: task-514-523-librarian-gc-script-qa
type: TASK
title: QA Librarian Garbage Collection Script
status: READY
owner_persona: qa
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on:
  - task-514-522-librarian-gc-script-tests
jules_session_id: null
pr_number: null
parent: story-410-514-librarian-garbage-collection-script
tags:
  - foundry
  - github-scripts
  - qa
  - librarian
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Librarian Garbage Collection Script

## Objective
Verify the librarian garbage collection script functionality, ensuring it behaves correctly and safely.

## Acceptance Criteria
- [ ] Verify that the implemented script correctly identifies and archives/deletes stale or processed agent journals based on the defined criteria.
- [ ] Verify that active, un-processed journals and non-journal files are completely ignored by the script.
- [ ] Verify that the provided unit and integration tests are robust and cover edge cases.
- [ ] Verify execution time and resource usage are within acceptable limits for a background GitHub Action script.
