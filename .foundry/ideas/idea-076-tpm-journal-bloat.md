---
id: idea-076-tpm-journal-bloat
type: IDEA
title: Investigate TPM Journal Bloat and Orchestrator Logging
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '9652472312722583880'
pr_number: null
parent: null
tags:
  - architecture
  - logging
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Idea: Investigate TPM Journal Bloat and Orchestrator Logging

## Context
During a recent Archivist run (PR `archivist-tpm-cleanup`), it was observed that the TPM journal (`.foundry/journals/tpm.md`) was heavily bloated with routine task verification and state transition logs (e.g., "PR merged", "Resurrection Loop triggered"). This violates the policy that journals should only contain critical learnings. A PR comment indicated that the TPM journal is maintained by the Orchestrator script or the Foundry Engine GitHub Action.

## Objective
The objective is to determine if the continuous logging into the TPM journal indicates an underlying problem in the Foundry orchestrator, or if it's simply unnecessary logging that should be removed.

## Proposal
1. Spawn a RESEARCH node to investigate the Orchestrator script / Foundry Engine GitHub Action to understand why and where it logs these routine updates to the TPM journal.
2. The Agile Coach or Product Manager should analyze the findings to determine if this behavior is indicative of a systemic issue.
3. If no systemic issue exists, propose removing the logging statements from the Orchestrator/Action to prevent future bloat, strictly adhering to the "journals are for critical learnings only" policy.

## Acceptance Criteria
- [ ] Create a RESEARCH node to investigate the Orchestrator/Foundry Engine logging mechanism.
- [ ] Analyze the research findings.
- [ ] Create a TASK node (if applicable) to implement the removal of the logging statements from the orchestrator.
