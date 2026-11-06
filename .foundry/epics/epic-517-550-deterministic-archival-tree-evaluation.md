---
id: epic-517-550-deterministic-archival-tree-evaluation
type: EPIC
title: Tree Completeness Evaluation and File Moves
status: COMPLETED
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-11-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-152-517-deterministic-dag-tree-archival
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Tree Completeness Evaluation and File Moves

## Objective
Update the orchestrator to evaluate node completeness at the tree level and move files to archive when terminal.

## Acceptance Criteria
- [x] story-550-573-tree-level-completeness-logic
- [x] story-550-574-archival-file-move-automation
- [x] story-550-575-archival-tree-evaluation-e2e
- [x] Implement tree-level completeness verification evaluating entire parent/descendant chain
- [x] Block archival if any node in the tree is non-terminal
- [x] Implement systematic file move to `.foundry/archive/*` preserving subdirectories for terminal trees
- [x] Ensure archival operation is deterministic and automated via orchestrator cycle
- [x] Generate E2E verification story
