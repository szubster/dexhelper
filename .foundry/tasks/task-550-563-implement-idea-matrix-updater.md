---
id: task-550-563-implement-idea-matrix-updater
type: TASK
title: Implement Idea Matrix Updater
status: PENDING
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-550-562-design-idea-matrix-schema
jules_session_id: null
parent: story-532-550-idea-dependency-matrix-architecture
tags:
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Idea Matrix Updater

## Summary
Implement a script or process to populate and update the Idea Dependency Matrix from existing Foundry nodes.

## Requirements
- Create a script (e.g., in `.github/scripts/`) that parses `.foundry/ideas/` and other relevant directories.
- The script should generate or update `.foundry/docs/architecture/idea_dependency_matrix.md` according to the schema.

## Acceptance Criteria
- [ ] Script is implemented and correctly parses existing IDEA nodes.
- [ ] Script updates the matrix file without removing manual annotations (if supported by schema) or generates it deterministically.