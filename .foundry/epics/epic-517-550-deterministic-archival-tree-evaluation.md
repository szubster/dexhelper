---
id: epic-517-550-deterministic-archival-tree-evaluation
type: EPIC
title: Tree Completeness Evaluation and File Moves
status: READY
owner_persona: story_owner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-152-517-deterministic-dag-tree-archival
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Tree Completeness Evaluation and File Moves

## Objective
Update the orchestrator to evaluate node completeness at the tree level and move files to archive when terminal.

## Acceptance Criteria
- [ ] Implement tree-level completeness verification evaluating entire parent/descendant chain
- [ ] Block archival if any node in the tree is non-terminal
- [ ] Implement systematic file move to `.foundry/archive/*` preserving subdirectories for terminal trees
- [ ] Ensure archival operation is deterministic and automated via orchestrator cycle
- [ ] Generate E2E verification story
