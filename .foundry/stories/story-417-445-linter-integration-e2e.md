---
id: story-417-445-linter-integration-e2e
type: STORY
title: Integration and E2E Verification of ADR Compliance Linter
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-23T00:00:00.000Z'
updated_at: '2026-08-23'
depends_on:
  - story-417-444-adr-013-state-compliance-linter
jules_session_id: null
pr_number: null
parent: epic-142-417-automated-adr-compliance-linter
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integration and E2E Verification of ADR Compliance Linter

## Problem Definition
With the implementation of the ADR compliance linter scripts for UI constraints (ADR 008) and state management constraints (ADR 013), we must ensure these checks run reliably within the CI/CD pipeline and effectively catch violations without producing false positives.

## Proposed Solution
- Create a comprehensive suite of integration/E2E tests specifically for `scripts/verify-adr-compliance.ts`.
- The tests should run the script against mock `.tsx` files containing deliberate violations (e.g., `rounded-sm`, lack of context usage) and assert that the script correctly flags them and fails.
- The tests should also verify the script passes successfully on compliant mock files.
- Integrate the script execution into the global `pnpm lint` flow or a dedicated `pnpm run verify-adr` step in the CI configuration.

## Acceptance Criteria
- [ ] Break down this story into actionable engineering tasks.
