---
id: task-544-549-dynamic-node-spawning-heartbeat
type: TASK
title: Update foundry-heartbeat for Dynamic Node Spawning
status: READY
owner_persona: coder
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-539-544-implement-dynamic-node-spawning
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update foundry-heartbeat for Dynamic Node Spawning

## Description
Modify `.github/scripts/foundry-heartbeat.ts` to implement the late-binding workflow.
When an ACTIVE node has unchecked acceptance criteria boxes (`- [ ]`), instead of automatically failing it, check if it has spawned child nodes (by iterating over all nodes to find any that declare this node as their \`parent\`). If it does have spawned child nodes (or if the node type is natively a generative parent macro node like IDEA, PRD, EPIC, or STORY), gracefully demote its status to \`PENDING\`. If it is a leaf node (e.g. TASK, RESEARCH) with unchecked boxes but no spawned children, correctly mark it as \`FAILED\`.

## Acceptance Criteria
- [ ] Implement the logic in `foundry-heartbeat.ts` to check if a node has unchecked acceptance criteria checkboxes.
- [ ] Implement the logic to discover if the node has spawned children (by reading the `parent` property in other node's YAML frontmatter).
- [ ] Transition the node to `PENDING` if it has unchecked boxes AND either has spawned children or is a generative macro node (`IDEA`, `PRD`, `EPIC`, `STORY`).
- [ ] Transition the node to `FAILED` with a proper `rejection_reason` if it has unchecked boxes but no spawned children and is not a generative macro node.
