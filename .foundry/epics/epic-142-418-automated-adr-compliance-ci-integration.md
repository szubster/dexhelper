---
id: epic-142-418-automated-adr-compliance-ci-integration
type: EPIC
title: Automated ADR Compliance CI Integration
status: ACTIVE
owner_persona: story_owner
created_at: '2025-01-01T00:00:00.000Z'
updated_at: '2026-10-16'
depends_on:
  - epic-142-417-automated-adr-compliance-linter
jules_session_id: '8039302708999177663'
pr_number: null
parent: prd-142-342-automated-adr-compliance-linter
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Automated ADR Compliance CI Integration

## Problem Definition
After the script `scripts/verify-adr-compliance.ts` is implemented, it must be integrated with the system's CI, `package.json` scripts, and Lefthook configuration to guarantee it's run.

## Proposed Solution
- Add the `verify-adr-compliance` script to `package.json`.
- Integrate the check with `lefthook.yml`.
- Ensure it's executed as part of `pnpm lint`.

## Acceptance Criteria
- [ ] story-418-676-adr-compliance-package-scripts
- [ ] story-418-677-adr-compliance-lefthook-integration
- [ ] story-418-678-adr-compliance-integration-e2e
- [x] Break down this epic into stories.
- [x] Ensure a final STORY is generated that is dedicated exclusively to Integration and E2E Verification.
