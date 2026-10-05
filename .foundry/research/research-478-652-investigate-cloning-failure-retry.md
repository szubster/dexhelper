---
id: research-478-652-investigate-cloning-failure-retry
type: RESEARCH
title: Investigate DAG Node Cloning Logic Failure (Retry)
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-03'
updated_at: '2026-10-04'
depends_on: []
jules_session_id: '2899727411414053624'
pr_number: null
parent: story-412-478-node-cloning-logic
tags:
  - orchestrator
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate DAG Node Cloning Logic Failure (Retry)

## Objective
Investigate the root cause of the permanent failure in the `research-478-638-investigate-cloning-logic-failure` node.

## Scope
1. Review the failure logs and previous implementations for node cloning logic.
2. Determine why the previous research node permanently failed.
3. Recommend a robust approach for duplicating DAG nodes and generating collision-free IDs within the Orchestrator.

## Findings
The permanent failure of `task-478-507-orchestrator-cloning-logic` and its subsequent retries was a system-level false permanent failure. The sessions crashed or terminated prematurely (e.g., submitting empty PRs without checking off completion boxes or triggering `AWAITING_USER_FEEDBACK`) without making any actual codebase implementation attempts, causing the Orchestrator to repeatedly reject the task until it reached the maximum limit.

## Recommendations
A robust approach for duplicating DAG nodes and generating collision-free IDs involves:
1. Using the Parent-Linked ID Schema properly by uniquely incrementing the globally pooled sequence number (`<NNN>`) per node directory, rather than resetting it per parent.
2. Safely parsing node files by strictly isolating the YAML frontmatter block (e.g., using `gray-matter`) to extract metadata without accidentally matching markdown content.
3. Duplicating the node structure in-memory and updating references, but strictly avoiding adding the parent to the new child's `depends_on` array to prevent circular dependency deadlocks.

## Acceptance Criteria
- [x] Determine root cause of failure
- [x] Provide robust approach recommendations
