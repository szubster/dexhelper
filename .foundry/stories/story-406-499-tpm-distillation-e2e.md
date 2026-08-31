---
id: story-406-499-tpm-distillation-e2e
type: STORY
title: E2E Verification of TPM Distillation Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on:
  - story-406-497-tpm-epic-detection-logic
  - story-406-498-tpm-aggregation-and-archival
jules_session_id: null
pr_number: null
parent: epic-339-406-tpm-distillation-logic
tags:
  - foundry
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
---

# E2E Verification of TPM Distillation Logic

## Objective
Verify the end-to-end flow of the TPM Distillation and Archival Logic.

## Requirements
- Provide E2E tests that set up a complete mock environment with a `COMPLETED` EPIC and child STORY/TASK nodes.
- Execute the TPM distillation logic.
- Verify that the EPIC node was appended with the correct Changelog & Learnings summary.
- Verify that the child nodes were moved to `.foundry/archive/stories/` and `.foundry/archive/tasks/`.

## Acceptance Criteria
- [ ] Implement E2E tests for the TPM distillation logic flow.
- [ ] Ensure tests successfully verify file appending and archival moves.
