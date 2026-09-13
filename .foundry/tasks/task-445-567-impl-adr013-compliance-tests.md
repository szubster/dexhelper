---
id: task-445-567-impl-adr013-compliance-tests
type: TASK
title: Implement ADR-013 Compliance Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-10'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-445-linter-integration-e2e
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
  - e2e
  - integration
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement ADR-013 Compliance Tests

## Objective
Implement comprehensive test cases for ADR-013 compliance in `scripts/verify-adr-compliance.test.ts`.

## Context
With the implementation of the ADR compliance linter scripts for UI constraints (ADR 008) and state management constraints (ADR 013), we must ensure these checks run reliably. The story `story-417-445-linter-integration-e2e` mandates integration/E2E verification.

## Instructions
1. Open `scripts/verify-adr-compliance.test.ts`.
2. Add test cases to verify the `checkAdr013ComplianceInFile` function.
3. Test against mock `.tsx` files containing deliberate violations:
   - A component using local `useState` instead of shared React Context.
4. Test against compliant mock files (e.g., a file named `DagContext.tsx` which is allowed to have state).
5. Assert that the script correctly flags the violations and fails for non-compliant files, and passes successfully on compliant mock files.

## Acceptance Criteria
- [ ] Test cases are added for ADR-013 compliance in `scripts/verify-adr-compliance.test.ts`.
- [ ] Tests verify that local `useState` usage correctly flags an ADR 013 violation.
- [ ] Tests verify that `DagContext.tsx` is explicitly ignored/allowed.
- [ ] All new tests pass successfully via `npx vitest run scripts/verify-adr-compliance.test.ts`.