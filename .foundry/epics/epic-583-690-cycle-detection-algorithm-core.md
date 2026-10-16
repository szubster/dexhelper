---
id: epic-583-690-cycle-detection-algorithm-core
type: EPIC
title: EPIC - Cycle Detection Algorithm Core Implementation
status: READY
owner_persona: story_owner
created_at: 2026-10-16T18:06:01.090Z
updated_at: 2026-10-16
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-527-583-foundry-dag-deadlock-detector
tags:
  - orchestrator
  - dag
  - algorithm
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
locks: []
priority: 50
---

# EPIC: Cycle Detection Algorithm Core Implementation

## Objective
Implement a robust cycle detection algorithm (e.g., Kahn's or Tarjan's algorithm) within the Foundry Orchestrator (\`foundry-orchestrator.ts\`). This core engine will analyze the dependency graph defined by all Foundry nodes' \`depends_on\` and \`parent\` fields to proactively identify circular dependencies before they cause execution deadlocks.

## Requirements
1. The cycle detection algorithm must accurately process a graph of \`ACTIVE\`, \`READY\`, \`PENDING\`, and \`BLOCKED\` nodes.
2. It must be resilient to missing node references (e.g., unresolved dependencies).
3. It must execute efficiently (O(V+E)) to prevent significant overhead in the orchestrator dispatch loop.

## Acceptance Criteria
- [ ] Implement cycle detection algorithm in Foundry Orchestrator.
- [ ] Add unit tests verifying both direct and indirect cyclic dependency detection in the orchestrator suite.
- [ ] Ensure missing node dependencies do not cause the algorithm to crash or misreport cycles.
