---
id: story-418-491-adr-compliance-ci-integration-e2e
type: STORY
title: E2E Verification for ADR Compliance CI Integration
status: READY
owner_persona: tech_lead
created_at: '2026-10-16T00:00:00.000Z'
updated_at: '2026-10-16'
depends_on:
  - story-418-490-adr-compliance-ci-integration-impl
jules_session_id: null
pr_number: null
parent: epic-142-418-automated-adr-compliance-ci-integration
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
locks: []
---

# E2E Verification for ADR Compliance CI Integration

## Description
This story covers the end-to-end testing and integration verification required to ensure that the ADR compliance linter runs successfully in CI and blocks invalid code from being committed via git hooks (Lefthook).

## Acceptance Criteria
- [ ] Verify that running `pnpm lint` triggers the `scripts/verify-adr-compliance.ts` script.
- [ ] Verify that failing the ADR check prevents a commit if triggered by Lefthook.
