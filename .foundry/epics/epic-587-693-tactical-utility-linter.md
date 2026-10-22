---
id: epic-587-693-tactical-utility-linter
type: EPIC
title: 'Epic: Automated Tactical Utility Usage Linter'
status: PENDING
owner_persona: story_owner
created_at: '2026-10-22T06:34:26Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-534-587-automated-tactical-utility-usage-linter-rule
tags:
  - linter
  - styling
  - adr008
  - adr024
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Automated Tactical Utility Usage Linter

## Description
This Epic tracks the implementation of an automated linter rule or standalone script to detect raw inline Tailwind utility combinations (e.g., `rounded-none border-dashed font-mono`) that should be standardized as `@utility` primitives (e.g., `tactical-panel`, `tactical-text`). It covers developing the analysis logic, mapping violations to their tactical equivalents, and integrating the check into the `pnpm lint` workflow with actionable error messages.

## Acceptance Criteria
- [ ] Decompose this Epic into discrete STORY nodes.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
