---
id: story-418-490-adr-compliance-ci-integration-impl
type: STORY
title: Integrate ADR Compliance Linter into CI and Package Scripts
status: READY
owner_persona: tech_lead
created_at: '2026-10-16T00:00:00.000Z'
updated_at: '2026-10-16'
depends_on:
  - epic-142-417-automated-adr-compliance-linter
jules_session_id: null
pr_number: null
parent: epic-142-418-automated-adr-compliance-ci-integration
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

# Integrate ADR Compliance Linter into CI and Package Scripts

## Description
This story covers the integration of the `scripts/verify-adr-compliance.ts` script into the project's ecosystem. This includes adding the script to `package.json` and integrating it with `lefthook.yml` to ensure it is run as part of the `pnpm lint` flow.

## Acceptance Criteria
- [ ] Add the `verify-adr-compliance` script to `package.json`.
- [ ] Integrate the check with `lefthook.yml`.
- [ ] Ensure it's executed as part of `pnpm lint`.
