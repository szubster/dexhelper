---
id: idea-527-foundry-dag-deadlock-detector
type: IDEA
title: Automated Foundry DAG Circular Dependency & Deadlock Detector
status: PENDING
owner_persona: product_manager
created_at: '2026-09-20'
updated_at: '2026-09-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - orchestrator
  - dag
  - validation
  - pipeline
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Automated Foundry DAG Circular Dependency & Deadlock Detector

## Problem Statement
As the Foundry software factory processes complex features, generative personas (PM, Epic Planner, Story Owner, Tech Lead) continuously spawn and link nodes via `depends_on` and `parent` relationships. Occasionally, invalid node linkage or manual edits create circular dependency loops (e.g. Node A depends on Node B, Node B depends on Node C, and Node C depends on Node A).

Currently, when a circular dependency loop or unresolvable cyclic dependency exists in active nodes, affected nodes become permanently `BLOCKED`, stalling execution without a clear diagnostic error message. Orchestrator runs continue attempting to dispatch unblocked nodes, consuming execution cycles while the deadlocked subgraph remains stuck indefinitely.

## Proposed Solution
Introduce an automated Circular Dependency & Deadlock Detector into the Foundry Orchestrator validation suite:
1. **Topological Cycle Analysis**: Implement a Tarjan or Kahn algorithm-based graph cycle detection routine inside `.github/scripts/foundry-orchestrator.ts` (or as a standalone validation CLI tool).
2. **Pre-Dispatch Validation Check**: Execute cycle detection as part of the orchestrator's pre-dispatch phase before dispatching `READY` nodes.
3. **Automated Diagnostic Logging & Alerts**: When a cyclic dependency loop is detected, output an explicit diagnostic log detailing the exact path of the cycle (e.g., `Deadlock Cycle Detected: task-100 -> story-050 -> task-100`).
4. **Auto-Demotion / Auto-Flagging**: Automatically flag cyclic nodes with status `FAILED` or trigger the `mechanic` persona to perform graph healing (per IDEA-156) to break the circular dependency cleanly.

## Value Proposition
- **Pipeline Reliability**: Prevents silent deadlocks from stalling pipeline progress and blocking downstream node execution.
- **Observability**: Gives developers and scheduled agents clear, actionable cycle paths rather than mysterious `BLOCKED` states.
- **Factory Throughput**: Minimizes wasted orchestrator polling cycles on unresolvable deadlocked subgraphs.

## Acceptance Criteria
- [ ] Implement cycle detection algorithm in Foundry Orchestrator to scan active `.foundry/` node graphs.
- [ ] Add explicit error logging and cyclic path tracing when a dependency loop is detected.
- [ ] Integrate cycle detection into `scripts/validate-foundry-schema.ts` or orchestrator pre-dispatch checks.
- [ ] Write unit tests verifying detection of direct (2-node) and indirect (N-node) circular dependency loops.
- [ ] prd-527-583-foundry-dag-deadlock-detector
