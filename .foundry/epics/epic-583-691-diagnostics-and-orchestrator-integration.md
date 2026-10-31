---
id: epic-583-691-diagnostics-and-orchestrator-integration
type: EPIC
title: EPIC - Cycle Detection Diagnostics and Pre-Dispatch Integration
status: PENDING
owner_persona: story_owner
created_at: 2026-10-16T18:06:01.101Z
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-527-583-foundry-dag-deadlock-detector
tags:
  - orchestrator
  - logging
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# EPIC: Cycle Detection Diagnostics and Pre-Dispatch Integration

## Objective
Integrate the cycle detection core engine seamlessly into the Foundry Orchestrator's pre-dispatch checks. Ensure that any detected cycles immediately emit actionable diagnostic logs detailing the exact cyclic path, and safely skip or demote the affected nodes to prevent infinite dispatch loops.

## Requirements
1. Run the cycle detection routine before dispatching any nodes to new sessions.
2. Output a clear, explicit diagnostic log (e.g., \`Deadlock Cycle Detected: node-a -> node-b -> node-a\`).
3. Safely transition affected nodes in a cycle to a skipped or demoted state (e.g., \`FAILED\` or \`BLOCKED\`) to alert the \`mechanic\` persona or prevent further processing.

## Acceptance Criteria
- [ ] Integrate cycle detection seamlessly into orchestrator pre-dispatch checks.
- [ ] Output explicit diagnostic logs detailing the cyclic path when detected.
- [ ] Ensure affected nodes are explicitly skipped or demoted from dispatch.
- [ ] story-691-712-cycle-detection-diagnostics-logger
- [ ] story-691-713-orchestrator-pre-dispatch-integration
- [ ] story-691-714-orchestrator-cycle-detection-e2e
