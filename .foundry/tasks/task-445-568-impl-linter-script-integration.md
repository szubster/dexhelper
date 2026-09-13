---
id: task-445-568-impl-linter-script-integration
type: TASK
title: Integrate ADR Compliance Linter Script
status: PENDING
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-445-567-impl-adr013-compliance-tests
jules_session_id: null
pr_number: null
parent: story-417-445-linter-integration-e2e
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Integrate ADR Compliance Linter Script

## Objective
Integrate the `scripts/verify-adr-compliance.ts` script into the global `pnpm lint` flow in the CI configuration.

## Context
With the implementation of the ADR compliance linter scripts for UI constraints (ADR 008) and state management constraints (ADR 013), we must ensure these checks run reliably within the CI/CD pipeline and effectively catch violations. The story `story-417-445-linter-integration-e2e` mandates this integration.

## Instructions
1. Open `package.json`.
2. Add a new script named `lint:adr` that executes the ADR compliance script. Since the script uses native typescript stripping, use a command like `node --experimental-strip-types scripts/verify-adr-compliance.ts`.
3. Modify the existing global `lint` script in `package.json` to include `pnpm lint:adr`. Ensure it runs alongside the other linting commands.
4. Verify that running `pnpm lint` locally correctly invokes the ADR compliance checks.

## Acceptance Criteria
- [ ] A `lint:adr` script is added to `package.json`.
- [ ] The global `lint` script in `package.json` is updated to include `pnpm lint:adr`.
- [ ] Running `pnpm lint` locally successfully executes the ADR compliance checks.