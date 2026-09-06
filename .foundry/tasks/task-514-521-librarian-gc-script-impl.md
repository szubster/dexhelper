---
id: task-514-521-librarian-gc-script-impl
type: TASK
title: Implement Librarian Garbage Collection Script
status: ACTIVE
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '4952716843902735103'
pr_number: null
parent: story-410-514-librarian-garbage-collection-script
tags:
  - foundry
  - github-scripts
  - optimization
  - librarian
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Librarian Garbage Collection Script

## Objective
Implement the script to perform garbage collection on stale or processed agent journals as part of the librarian persona's responsibilities.

## Acceptance Criteria
- [x] Implement `sweep-journals.ts` (or similar script name) in `.github/scripts/` to handle deletion/archiving of old `.jules/*/*.md` and `.foundry/journals/*.md` files.
- [x] Define the logic to determine which journals are eligible for garbage collection (e.g., older than a certain timestamp, or explicitly marked as processed).
- [x] Ensure the script runs reliably and handles file system operations safely without deleting active, un-processed files.
