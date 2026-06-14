---
id: research-076-174-investigate-tpm-journal-bloat
type: RESEARCH
title: Investigate Orchestrator TPM Journal Logging Mechanism
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '15918807968795082903'
pr_number: null
parent: idea-076-tpm-journal-bloat
tags:
  - architecture
  - logging
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Investigate Orchestrator TPM Journal Logging Mechanism

## Context
The TPM journal (`.foundry/journals/tpm.md`) is heavily bloated with routine task verification and state transition logs. Journals are meant for critical learnings only.

## Objective
Investigate the Orchestrator script and Foundry Engine GitHub Action to understand why and where it logs these routine updates.

## Acceptance Criteria
- [x] Identify the exact files and lines of code responsible for logging to the TPM journal.
- [x] Determine if the logging behavior serves a systemic purpose or if it's unnecessary bloat.

## Findings
- **Files and lines of code**: The `.github/scripts/dag-utils.ts` script handles appending messages to the `tpm.md` journal via the `logToJournal` function. The orchestrator script `.github/scripts/foundry-heartbeat.ts` calls `logToJournal` excessively across multiple lines (e.g., 45, 88, 102, 120, 133, 155, 168, 179, 205, 218, 488) to log routine state transitions, system failures, node cleanup, etc.
- **Systemic Purpose vs. Bloat**: This logging behavior is unnecessary bloat. According to the TPM persona documentation (`.foundry/docs/knowledge_base/agents/core_policies.md` and `.github/agents/tpm.md`), the `tpm.md` file is strictly for logging long-term lessons, architectural constraints, and recurring failures, not as a ledger to record completed tasks or step transitions. The orchestrator and PR history already track what happened. Routine task verification logs in this journal degrade long-term memory context and waste context tokens without serving any functional orchestrator purpose.
