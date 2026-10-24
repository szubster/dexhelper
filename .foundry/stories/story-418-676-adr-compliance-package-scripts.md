---
id: story-418-676-adr-compliance-package-scripts
type: STORY
title: Add ADR Compliance Package Scripts
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-10-16T21:05:41.924Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-142-418-automated-adr-compliance-ci-integration
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Add ADR Compliance Package Scripts

## Problem Definition
The script `scripts/verify-adr-compliance.ts` must be integrated with the system's `package.json` scripts to easily run the compliance check and be included as part of the `pnpm lint` workflow.

## Proposed Solution
- Add a new script to `package.json` that executes `node --experimental-strip-types scripts/verify-adr-compliance.ts`.
- Update the `lint` script in `package.json` to ensure the compliance check is run alongside other linters.

## Acceptance Criteria
- [x] task-676-702-add-adr-compliance-scripts
- [x] Decompose this story into actionable TASK nodes.
