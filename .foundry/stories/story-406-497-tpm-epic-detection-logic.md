---
id: story-406-497-tpm-epic-detection-logic
type: STORY
title: TPM EPIC Detection Logic
status: READY
owner_persona: tech_lead
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-339-406-tpm-distillation-logic
tags:
  - foundry
  - script
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TPM EPIC Detection Logic

## Objective
Implement logic to detect completed EPICs and trigger distillation.

## Requirements
- Identify `COMPLETED` EPIC nodes in `.foundry/epics/`.
- Return a list of completed EPICs for distillation processing.

## Acceptance Criteria
- [ ] Implement detection logic for completed EPICs.
- [ ] Ensure unit tests verify detection logic.
