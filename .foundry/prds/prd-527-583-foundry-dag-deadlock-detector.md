---
id: prd-527-583-foundry-dag-deadlock-detector
type: PRD
title: PRD - Automated Foundry DAG Circular Dependency & Deadlock Detector
status: PENDING
owner_persona: epic_planner
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-527-foundry-dag-deadlock-detector
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

# PRD: Automated Foundry DAG Circular Dependency & Deadlock Detector

## 1. Product Context & Vision
As the Foundry system processes complex features autonomously, generative personas dynamically spawn and link task nodes using `depends_on` arrays. Given the complexity of execution graphs, misconfigurations or algorithmic flaws in generative personas can accidentally create circular dependency loops (e.g., A -> B -> C -> A).

Currently, such cycles result in `BLOCKED` nodes that indefinitely halt pipeline execution with no diagnostic visibility. The goal of this product requirement is to introduce robust topological validation within the `foundry-orchestrator.ts` to proactively detect, log, and handle deadlocks before the orchestrator unnecessarily cycles on unresolvable subgraphs.

## 2. Target Audience
- **Foundry Core Engineers & TPMs**: Need visibility into pipeline health and stuck subgraphs.
- **Scheduled Automated Agents (Mechanic)**: Need programmatic alerts of cycles to attempt automated graph healing.
- **Foundry Orchestrator**: Needs to avoid wasting polling cycles on dead nodes.

## 3. Core Capabilities & Requirements
1. **Cycle Detection Engine**:
   - Must implement a standard topological sorting algorithm (like Kahn's or Tarjan's) within the `.github/scripts/foundry-orchestrator.ts` script.
   - Must evaluate the graph of all `ACTIVE`, `READY`, `PENDING`, and `BLOCKED` nodes located in the `.foundry/` directory based on their `depends_on` and `parent` fields.
2. **Pre-Dispatch Validation**:
   - The orchestrator must run the cycle detection routine before attempting to dispatch any node into a new session.
3. **Diagnostic Logging**:
   - Upon cycle detection, the system must emit an explicit, actionable error message detailing the specific node path of the cycle (e.g., `Deadlock Cycle Detected: task-100 -> story-050 -> task-100`).
4. **Auto-Demotion Workflow**:
   - Nodes detected within a cycle must be explicitly skipped for dispatch or transitioned to `FAILED` or `BLOCKED` status safely.
   - Alternatively, it must trigger alerts for the `mechanic` persona to execute automated graph healing.

## 4. Acceptance Criteria
- [ ] Implement cycle detection algorithm in Foundry Orchestrator.
- [ ] Output explicit diagnostic logs detailing the cyclic path when detected.
- [ ] Integrate cycle detection seamlessly into orchestrator pre-dispatch checks.
- [ ] Add unit tests verifying both direct and indirect cyclic dependency detection in the orchestrator suite.

## 5. Non-Functional Constraints
- **Performance**: The detection algorithm must execute efficiently (O(V+E)) to prevent slowing down the core orchestrator dispatch loop.
- **Resilience**: Must handle missing node references gracefully (e.g., a node depends on an ID that doesn't exist).

## 6. Implementation Scope
This PRD scopes the creation of the detection mechanism and logging within the orchestrator script (`.github/scripts/foundry-orchestrator.ts`).

## Acceptance Criteria (Parent Idea linkage)
- [ ] Break down into EPIC