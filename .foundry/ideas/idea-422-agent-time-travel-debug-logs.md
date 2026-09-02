---
id: idea-422-agent-time-travel-debug-logs
type: IDEA
title: "Foundry: Agent 'Time-Travel' Execution Snapshots & Replay"
status: READY
owner_persona: product_manager
created_at: '2026-08-27'
updated_at: '2026-08-27'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - debugging
  - architecture
  - observability
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Agent 'Time-Travel' Execution Snapshots & Replay

## 1. Context & Problem Statement
Currently, debugging why an autonomous Foundry agent failed or made a specific decision relies primarily on parsing the final PR description, reading static journal entries (`.foundry/journals/`), or combing through linear CI action logs.
When complex graph deadlocks occur or agents repeatedly fail on a task (the "Impossible Loop"), it is incredibly difficult to reconstruct the *exact state of the repository* at the precise moment the agent made a crucial mistake, because the workspace is ephemeral and subsequent steps or agents overwrite the state.

## 2. Recommended Approach: Time-Travel Execution Snapshots
Introduce an observability layer to the Foundry orchestrator and Jules agent environment that automatically commits "Time-Travel Snapshots" to a hidden branch (`foundry/snapshots/<session_id>`) during execution.

1. **Snapshot Triggers:**
   - Before and after every major `run_in_bash_session` tool invocation.
   - Upon encountering any non-zero exit code during file modifications.
   - Immediately before triggering a permanent `FAILED` or `CANCELLED` status transition.
2. **Snapshot Mechanism:**
   - The agent environment (or a wrapping script in `.github/scripts/`) intercepts tool calls that mutate state.
   - It performs a lightweight `git commit -a -m "Snapshot: [Tool Name] - [Timestamp]"` on the detached snapshot branch.
3. **Replay & Inspection:**
   - Maintainers or the `mechanic` persona can checkout the snapshot branch to literally "time-travel" through the exact file states the agent saw, diffing step-by-step.
   - This allows instant root-cause analysis of hallucinated offsets, failed regex replacements, or broken DOM testing setups.

## 3. Value Proposition
- **Drastically Reduced MTTR (Mean Time To Resolution):** Developers can debug agent failures in seconds by seeing the exact workspace state, rather than guessing based on truncated CI logs.
- **Enhanced Agent Training:** Snapshot histories can be exported to form high-quality datasets for fine-tuning future agent prompts.
- **Observability Parity:** Brings the autonomous system's observability up to par with standard software debugging tools (like Redux Time Travel or Cypress snapshots).

## 4. Next Steps & Acceptance Criteria
- [ ] Product Manager: Draft a PRD specifying the git snapshot mechanism and integration points within `.github/workflows/foundry-scheduled-agent.yml` and the standard agent environment.
