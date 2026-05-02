---
id: task-023-qa-orchestrator-human-bypass
type: TASK
title: "QA Verification: Human Task Bypass in Orchestrator"
status: "COMPLETED"
owner_persona: qa
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on:
  - ".foundry/archive/tasks/task-022-orchestrator-human-bypass.md"
jules_session_id: null
parent: ".foundry/archive/stories/story-010-orchestrator-human-bypass.md"
tags:
  - "human-in-the-loop"
  - "orchestrator"
  - "qa"
---

# Task 023: QA Verification for Human Task Bypass in Orchestrator

## 1. Context
The orchestrator was modified in `task-022` to bypass the `READY` state for human-assigned tasks, instead promoting them directly to `ACTIVE`. As changes to the core orchestrator carry system-wide risk, an explicit QA step is required to ensure standard task routing is unharmed.

## 2. Validation Plan

### A. Run Automated Test Suite
- Run `pnpm test --dir .github/scripts/` to execute the vitest unit tests in the orchestrator directory.
- Verify that the newly added tests for "Human Bypass" execute and pass.
- Verify that NO existing orchestrator unit tests have been broken by the changes to `promoteNodeStatus`.

### B. Dry-Run Verification
- Temporarily create a dummy `human` node in the `PENDING` state with no dependencies.
- Execute `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --dry-run`.
- Verify the logs indicate the dummy node would be promoted from `PENDING` to `ACTIVE`.
- Verify the output JSON array does NOT contain the dummy node.
- Ensure standard nodes (e.g., `coder` or `qa`) are still correctly promoted to `READY` and are present in the JSON array.
- (Clean up dummy nodes after verification).

## 3. Acceptance Criteria
- [x] Automated orchestrator unit tests pass, including the new human bypass scenarios.
- [x] Dry-run execution confirms human tasks transition directly to `ACTIVE`.
- [x] Dry-run execution confirms human tasks are successfully omitted from the `readyNodes` matrix JSON output.
- [x] Global tests (`pnpm test`, `pnpm lint`, `pnpm test:e2e`) pass successfully.