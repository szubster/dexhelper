---
id: research-478-638-investigate-cloning-logic-failure
type: RESEARCH
title: Investigate DAG Node Cloning Logic Failure
status: CANCELLED
owner_persona: researcher
created_at: '2026-09-16'
updated_at: '2026-10-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - research
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
locks: []
---

# Investigate DAG Node Cloning Logic Failure

## Objective
Investigate the root cause of the permanent failure in the `task-478-507-orchestrator-cloning-logic` implementation.

## Scope
1. Review the failure logs and previous implementations for node cloning logic.
2. Determine why the cloning logic and ID generation failed.
3. Recommend a robust approach for duplicating DAG nodes and generating collision-free IDs within the Orchestrator.

## Research Report

### Findings
1. Explicit failure logs for the `task-478-507-orchestrator-cloning-logic` task could not be located in the current trace (not in `.foundry/journals/qa/master.md`, `.foundry/journals/auditor/master.md`, or `.foundry/journals/coder/master.md`).
2. According to `.foundry/docs/schema.md`, the Parent-Linked ID Schema (`<type>-<parent_NNN>-<NNN>-<slug>`) requires that the `<NNN>` segment must be uniquely incremented on a best-effort basis globally per node directory (e.g., all tasks share the same increment pool). It must not be reset per parent.
3. ID collisions in DAG nodes typically occur if this `<NNN>` segment is not correctly incremented globally across the target directory.

### Recommendation
To implement robust node cloning and generate collision-free IDs within the Orchestrator DAG:
1. Extract the `<parent_NNN>` from the parent node.
2. Determine the correct directory for the new node based on its `type` (e.g., `tasks` for `TASK`, `stories` for `STORY`).
3. List and sort the existing files in the corresponding directory to find the highest existing global sequence number (e.g., `ls -1 .foundry/tasks/ | sort -n -t '-' -k 3`).
4. Increment the maximum sequence number by 1 to generate the new `<NNN>`.
5. Construct the new ID using the Parent-Linked ID Schema: `<type>-<parent_NNN>-<NNN>-<slug>`.
