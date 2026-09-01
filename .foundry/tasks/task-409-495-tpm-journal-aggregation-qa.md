---
id: task-409-495-tpm-journal-aggregation-qa
type: TASK
title: QA TPM Journal Aggregation Script
status: PENDING
owner_persona: qa
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on:
  - task-409-493-tpm-journal-aggregation-script-impl
  - task-409-494-tpm-journal-aggregation-script-tests
jules_session_id: '5799943991093245774'
pr_number: null
parent: story-401-409-tpm-journal-aggregation
tags:
  - tpm
  - journals
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA TPM Journal Aggregation Script

## Description
Verify the implementation and testing of the TPM journal aggregation script and persona updates based on .github/agents/tpm.md.

## Acceptance Criteria
- [ ] Review `.github/scripts/aggregate-journals.ts` to ensure it correctly aggregates and archives timestamped `.md` files into `master.md`.
- [ ] Ensure unit tests pass and cover the aggregation and archiving logic comprehensively.
- [ ] Verify that `.github/agents/tpm.md` instructs the TPM persona to run the aggregation script.