---
id: research-517-668-investigate-orchestrator-generic-prompt-failure
type: RESEARCH
title: Investigate Orchestrator Generic Prompt Fallback Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-10-07'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: '7309315771347816850'
pr_number: null
parent: story-418-517-orchestrator-fallback-mechanisms
tags:
  - foundry
  - orchestrator
  - fallback
  - debugging
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Investigate Orchestrator Generic Prompt Fallback Failure

## Description
The child task `task-517-576-orchestrator-fallback-generic-prompt` reached its maximum rejection count and failed permanently. Investigate the orchestrator logs, QA journals, or auditor journals to identify the root cause of the failure and define how the replacement task should correctly implement it.

## Acceptance Criteria
- [x] Determine the root cause of the failure in `task-517-576-orchestrator-fallback-generic-prompt`.
- [x] Document findings and write any missing constants, logic, or architectural requirements needed.

## Findings
The failure of `task-517-576-orchestrator-fallback-generic-prompt` is a false permanent failure caused by a system-level agent session crash, not an actual QA rejection. The root cause is that the task's requirements (implementing a fallback string in `compilePromptForNode` and `compileScheduledPrompt` when persona markdown files cannot be found) had already been completed in an earlier commit before the task itself was dispatched to Jules.

When the agent handling `task-517-576` saw that the code changes were already present, it correctly identified that no code changes were needed but failed to submit an Empty PR because it ended the session without calling the `submit` tool. This violates the Empty PR Policy ("Even when you make zero file changes... you MUST still explicitly use the submit tool to create a Pull Request. If you simply end the session without calling submit, the Orchestrator's heartbeat will flag your session as a crashed zombie (FAILED)").

This issue is explicitly documented in memory under "False Permanent Failures (Agent Crashes)":
"If a Foundry task's rejection history shows `[ACKNOWLEDGED] Session terminated with state: COMPLETED` or `NOT_FOUND`, it represents a false permanent failure caused by a system-level agent session crash, not an actual QA rejection. A common root cause is submitting an empty PR without checking off the required Acceptance Criteria checkboxes in the node's markdown body."

## Missing Logic/Architectural Requirements
Since the implementation of `task-517-576-orchestrator-fallback-generic-prompt` is already complete in the codebase, the replacement task (`task-517-669-orchestrator-fallback-generic-prompt-retry`) should simply execute the Empty PR Policy to allow the task to transition to COMPLETED gracefully.

The replacement task must:
1. Verify that the generic prompt fallback logic is indeed already present in `foundry-orchestrator.ts`.
2. Check off its own Acceptance Criteria checkboxes in its Markdown body to satisfy ADR 007 completeness.
3. Submit an empty Pull Request (via the `submit` tool) to safely transition the node to `COMPLETED` and gracefully exit the DAG. No actual code modifications are required for the orchestrator prompt logic.
