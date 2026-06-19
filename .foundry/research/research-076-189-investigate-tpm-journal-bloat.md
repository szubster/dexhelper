---
id: research-076-189-investigate-tpm-journal-bloat
type: RESEARCH
title: Investigate TPM Journal Bloat and Orchestrator Logging
status: READY
owner_persona: researcher
created_at: '2026-06-16'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-076-tpm-journal-bloat
tags:
  - architecture
  - logging
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate TPM Journal Bloat and Orchestrator Logging

## Objective
Investigate the Orchestrator script (`.github/scripts/foundry-orchestrator.ts`) and Foundry Engine GitHub Action to understand why and where it logs routine task verification and state transition updates to the TPM journal (`.foundry/journals/tpm.md`). Determine if this continuous logging indicates an underlying problem or if it's simply unnecessary logging that should be removed.

## Acceptance Criteria
- [x] Identify the location(s) in the Orchestrator script or GitHub Action where logs are written to the TPM journal.
- [x] Analyze the purpose and necessity of these log statements.
- [x] Determine if the logging behavior is a symptom of a systemic issue or just unnecessary bloat.
- [x] Propose a solution (e.g., removing the logging statements) based on the findings.

## Findings
- **Investigation Results**: Extensive search within the `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` scripts revealed that they no longer contain any calls to the `logToJournal` function or any logic that writes to `.foundry/journals/tpm.md`.
- **Systemic Purpose vs. Bloat**: The logging behavior previously seen was unnecessary bloat, but this issue has already been resolved in a prior task (`task-076-179-remove-tpm-logging-orchestrator.md`).
- **Proposed Solution**: No further action is required regarding the Orchestrator scripts as the logging statements have already been removed. The current logging in the Orchestrator is limited to stdout (`info()` and `warn()`), which is correct.
