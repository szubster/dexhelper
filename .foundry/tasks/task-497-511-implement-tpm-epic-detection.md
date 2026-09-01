---
id: task-497-511-implement-tpm-epic-detection
type: TASK
title: Implement TPM EPIC Detection Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-406-497-tpm-epic-detection-logic
tags:
  - script
  - typescript
  - tpm
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement TPM EPIC Detection Logic

## Context
The TPM persona runs hourly and is responsible for archiving `COMPLETED` and `CANCELLED` nodes. To support distillation and archiving of epics, we first need logic to detect `COMPLETED` EPIC nodes in the orchestrator data layer.

## Objective
Implement a utility function or script logic that can identify `COMPLETED` EPIC nodes.

## Requirements
- Locate or create the appropriate TypeScript file (e.g. `tpm-distillation.ts` or in an existing util) under `.github/scripts/`.
- The logic must specifically target nodes with `type: EPIC` and `status: COMPLETED` within `.foundry/epics/`.
- Provide a function that returns a list of these completed EPIC nodes (their file paths and frontmatter).


## Acceptance Criteria
- [ ] Implement the detection function for completed EPIC nodes.
