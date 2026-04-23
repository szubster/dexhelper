---
id: "prd-001-agent-scheduling"
type: "PRD"
title: "Agent Scheduling"
status: "COMPLETED"
owner_persona: "epic_planner"
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on: []
jules_session_id: null
parent: ".foundry/archive/ideas/idea-002-tpm-scheduling.md"
tags: ["infrastructure"]
rejection_count: 0
notes: ""
---

# Agent Scheduling PRD

## 1. Objective
Design a generic, robust mechanism for scheduling autonomous agents (e.g., the TPM agent running hourly) within the Foundry architecture. The solution must handle empty results gracefully and be generic enough to apply to various agents with different scheduling needs. The TPM agent will be used as the initial reference implementation.

## 2. Background
Currently, the Foundry orchestrates tasks dynamically based on dependencies (DAG resolution). However, some operational roles—like the TPM archiving completed PRs or resolving deadlocks—need to happen on a recurring schedule rather than reacting to a specific DAG unblocking event. We need a way to integrate scheduled agents into the ecosystem without violating the core direct-commit and CEO-checkpoint principles of the Foundry.

## 3. Scope
- **In Scope:**
    - A generic GitHub Actions workflow or cron-based solution to trigger scheduled agents.
    - Handling scenarios where the agent's query returns no actionable work (empty results) without failing or spamming logs.
    - Implementing the schedule specifically for the `tpm` persona.
    - Ensuring scheduled agents use the same execution environment and API access patterns as DAG-triggered agents.

- **Out of Scope:**
    - Modifying the core DAG orchestrator logic for non-scheduled tasks.
    - Converting existing scheduled agents (e.g., `strategist`, `sweeper`) to this new system in this specific PRD (they will migrate in v1.5 as per ADR 001).

## 4. Requirements
### 4.1 Generic Scheduling Mechanism
- Must be configurable (e.g., via a `.yml` file or an array in an existing workflow) so adding a new scheduled agent is trivial.
- Must support standard cron expressions (e.g., hourly, daily).
- Must execute the agent using the standard Jules prompt hydration logic (reading `.github/agents/<persona>.md`).

### 4.2 Graceful Empty State Handling
- If a scheduled agent finds no work to do (e.g., the TPM finds zero `COMPLETED` nodes to archive), it must exit cleanly with a success status.
- It must not create empty PRs or throw errors that alert the CEO unnecessarily.

### 4.3 TPM Implementation
- The TPM agent (`.github/agents/tpm.md`) must be configured to run hourly.
- The TPM must be able to scan the `.foundry/` monofolder for `COMPLETED` nodes.
- If found, it should move them to an archive structure or clean them up according to TPM rules.

## Implementation Progress
- [x] Transformed into EPIC breakdowns (`epic-004-generic-agent-scheduling.md`, `epic-005-tpm-agent-scheduling.md`).

## 5. Acceptance Criteria
- [ ] A generic scheduling implementation is defined and documented.
- [ ] The TPM agent is scheduled to run hourly.
- [ ] Tests confirm that the scheduled run exits successfully when there is no work to do.
- [ ] The TPM agent successfully archives at least one test `COMPLETED` node when present.
