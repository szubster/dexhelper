---
id: idea-120-orchestrator-critical-path-scheduling
type: IDEA
title: Implement Critical Path Node Prioritization in the DAG Orchestrator
status: READY
owner_persona: product_manager
created_at: '2026-07-21'
updated_at: '2026-07-22'
depends_on: []
jules_session_id: null
rejection_reason: ''
---

# Idea: Implement Critical Path Node Prioritization in the DAG Orchestrator

## Problem
Currently, the Foundry DAG orchestrator promotes and resolves PENDING nodes to READY status linearly or without weighted prioritization. If multiple nodes become READY simultaneously, the orchestrator does not differentiate between a "leaf" task that blocks nothing and a "critical" task that blocks multiple downstream epics or stories. This lack of prioritization can lead to pipeline bottlenecks, where agents waste compute cycles on low-priority tasks while critical paths remain stalled.

## Proposed Solution
Implement a "Critical Path Score" or topological weight calculation during the orchestrator's `MAP` or `RESOLVE` phase.
1. The orchestrator should perform a reverse-graph traversal to count how many downstream nodes depend (directly or indirectly) on each node.
2. Nodes with higher downstream dependency counts are assigned a higher weight.
3. During the `COLLECT` and `OUTPUT` phases, the orchestrator should sort the list of `READY` nodes by this weight descending, ensuring that agents pick up tasks that unblock the largest portions of the DAG first.

This aligns with the focus on "scheduling enhancements to the multi-agent pipeline" and improves overall autonomous factory throughput.
