---
id: task-676-702-add-adr-compliance-scripts
type: TASK
title: Add ADR Compliance Package Scripts
status: COMPLETED
owner_persona: coder
created_at: '2024-05-10T12:00:00.000Z'
updated_at: '2026-10-22'
depends_on: []
parent: story-418-676-adr-compliance-package-scripts
jules_session_id: null
pr_number: null
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
---

# Add ADR Compliance Package Scripts

## Description
The script `scripts/verify-adr-compliance.ts` must be integrated with the system's `package.json` scripts to easily run the compliance check and be included as part of the `pnpm lint` workflow.

As a simple/low-risk change, no separate QA task is required. The coder should self-verify.

## Acceptance Criteria
- [x] Add a new script to `package.json` that executes `node --experimental-strip-types scripts/verify-adr-compliance.ts`.
- [x] Update the `lint` script in `package.json` to ensure the compliance check is run alongside other linters.
