---
id: prd-120-336-orchestrator-critical-path-scheduling
type: PRD
title: Implement Critical Path Node Prioritization in the DAG Orchestrator
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-23'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: null
parent: idea-120-orchestrator-critical-path-scheduling
---

# PRD: Implement Critical Path Node Prioritization in the DAG Orchestrator

## Overview
Currently, the Foundry DAG orchestrator promotes and resolves PENDING nodes to READY status without weighted prioritization. This can lead to agents picking up low-priority "leaf" tasks while critical path tasks that block multiple downstream nodes remain stalled. This PRD outlines the requirements for implementing a topological weight calculation (Critical Path Score) to prioritize READY nodes that unblock the largest portions of the DAG.

## Problem Statement
The multi-agent pipeline suffers from scheduling inefficiencies because the orchestrator treats all READY nodes equally. A task that blocks 10 other tasks has the same priority as a task that blocks none.

## Proposed Solution
Implement a topological weight calculation during the orchestrator's `MAP` or `RESOLVE` phase to assign a Critical Path Score to each node based on the number of nodes that depend on it (directly or indirectly). When outputting the list of READY nodes, sort them by this score descending.

## Requirements

1. **Topological Weight Calculation:**
   - The orchestrator must compute a "Critical Path Score" for every node in the DAG.
   - The score is defined as the total count of downstream nodes that depend on the given node, either directly or indirectly (transitive dependencies).

2. **Integration with Orchestrator Phases:**
   - The weight calculation should occur during the `MAP` or `RESOLVE` phase after the full DAG has been parsed.
   - The calculation must correctly handle potential cycles or at least gracefully degrade without infinite loops (though the DAG should be acyclic).

3. **READY Node Sorting:**
   - During the `COLLECT` and `OUTPUT` phases, the orchestrator must sort the list of `READY` nodes based on their computed Critical Path Score in descending order.
   - For nodes with the same score, standard alphabetical sorting (by node ID) or creation date can be used as a tie-breaker to ensure deterministic output.

4. **Testing and Validation:**
   - Unit tests must be updated/added to verify the correct calculation of the Critical Path Score for various DAG shapes (linear, branching, diamond).
   - Tests must confirm that the final queue of READY nodes is correctly sorted.

## Acceptance Criteria
- [ ] The orchestrator calculates a Critical Path Score for all nodes based on transitive downstream dependencies.
- [ ] READY nodes are sorted descending by their Critical Path Score before being picked up by agents.
- [ ] Tie-breaking logic is implemented for nodes with equal scores.
- [ ] Unit tests for weight calculation and sorting are implemented and passing.
