---
id: task-445-569-qa-adr-linter-integration
type: TASK
title: QA Verification of ADR Linter Integration
status: PENDING
owner_persona: qa
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on:
  - task-445-568-impl-linter-script-integration
jules_session_id: null
pr_number: null
parent: story-417-445-linter-integration-e2e
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
  - qa
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Verification of ADR Linter Integration

## Objective
Verify that the `verify-adr-compliance.ts` script is properly integrated into the `lint` command and correctly flags violations without false positives.

## Context
The story `story-417-445-linter-integration-e2e` mandates ensuring the ADR compliance linter checks run reliably. Implementation tasks have added tests (`task-445-567-impl-adr013-compliance-tests`) and integrated the script into `pnpm lint` (`task-445-568-impl-linter-script-integration`).

## Instructions
1. Run `pnpm lint` in the root directory.
2. Verify that the command succeeds if there are no violations in the current `src` directory.
3. Verify that the `lint:adr` script is present and called by the global `lint` script in `package.json`.
4. Run `pnpm test scripts/verify-adr-compliance.test.ts` to ensure the E2E/integration tests for the script pass.
5. Create a temporary mock file in the `src` directory that violates ADR 008 (e.g., contains `className="rounded-lg"`) or ADR 013 (e.g., uses `useState` locally within `components/dashboard/`).
6. Run `pnpm lint` again and verify that the command fails and explicitly reports the violation from the mock file.
7. Remove the temporary mock file after verification.

## Acceptance Criteria
- [ ] `pnpm lint` successfully runs and includes the ADR compliance checks.
- [ ] `pnpm test scripts/verify-adr-compliance.test.ts` passes.
- [ ] The linter correctly identifies and fails upon encountering deliberate violations in a temporary test file.
- [ ] The temporary test file is cleaned up after verification.