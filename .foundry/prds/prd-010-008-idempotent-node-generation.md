---
id: prd-010-008-idempotent-node-generation
type: PRD
title: Idempotent Node Generation Mechanism
status: "COMPLETED"
owner_persona: epic_planner
created_at: '2026-04-29'
updated_at: "2026-05-02"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-010-idempotent-node-generation.md
tags:
  - orchestrator
  - generation
  - efficiency
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Idempotent Node Generation Mechanism

## Executive Summary
The orchestrator currently suffers from an anomaly where Jules session credits are wasted if target nodes already exist. This PRD details the requirements for implementing an idempotent generation check to resolve this, ensuring the EMPTY PR POLICY does not lead to redundant API usage and session startups.

## Problem Statement
When a task explicitly spawns a child node, and the target node file already exists prior to the session, the orchestrator still spins up a Jules session. The agent wakes up, realizes the target artifact is complete, and reports there is no work to do. This wastes a session credit and delays pipeline execution.

## Proposed Solution
Implement an idempotent generation check in the orchestrator (`foundry-orchestrator.ts`) or a supporting CLI tool.
- Before transitioning a node that explicitly spawns child nodes to a dispatched state, the system must parse expected outputs.
- If the target files (e.g., generated PRD or task) already exist in the `.foundry/` directory and are completely formed, the orchestrator should bypass the session dispatch.
- Instead, the orchestrator should directly mark the current node's generation sub-task as fulfilled.

## Target Architecture
- **Orchestrator Logic**: Integrate a pre-flight file check before spawning the Jules matrix jobs.
- **State Store Validation**: Check existence and schema validity of target nodes in the monofolder.

## Edge Cases & Considerations
- **Partial Files**: If the target file exists but is malformed or lacks necessary fields, the generation session must still proceed or flag an error.
- **Reporting Anomaly**: As per rules, if target artifacts already exist unexpectedly, a small journal entry should be logged detailing the anomaly for later review by the Agile Coach.

## Acceptance Criteria
- [x] An idempotent check is integrated into the orchestrator prior to Jules session dispatch.
- [x] Valid pre-existing target nodes successfully abort unnecessary Jules agent wake-ups.
- [x] The parent node is marked appropriately fulfilled without dispatch if children already exist and are valid.
- [x] A small journal entry is logged indicating the unexpected presence of completed artifacts.


### Generated Epics
- [.foundry/epics/epic-008-017-orchestrator-preflight-checks.md](.foundry/epics/epic-008-017-orchestrator-preflight-checks.md)
- [.foundry/epics/epic-008-018-session-dispatch-bypass.md](.foundry/epics/epic-008-018-session-dispatch-bypass.md)
- [.foundry/epics/epic-008-019-anomaly-reporting-mechanism.md](.foundry/epics/epic-008-019-anomaly-reporting-mechanism.md)
