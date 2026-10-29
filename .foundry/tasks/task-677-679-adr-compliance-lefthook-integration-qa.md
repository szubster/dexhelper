---
id: task-677-679-adr-compliance-lefthook-integration-qa
type: TASK
title: QA ADR Compliance Lefthook Integration
status: READY
owner_persona: qa
created_at: '2026-10-18T19:00:00.000Z'
updated_at: '2026-10-29'
depends_on:
  - task-677-678-adr-compliance-lefthook-integration-impl
jules_session_id: '3355379518708574393'
pr_number: null
parent: story-418-677-adr-compliance-lefthook-integration
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
rejection_count: 0
confidence_score: 100
rejection_reason: ''
notes: ''
locks: []
---

# QA ADR Compliance Lefthook Integration

## Problem Definition
Verify that the `adr-compliance` command has been correctly integrated into `lefthook.yml`.

## Proposed Solution
- Check `lefthook.yml` to verify that the `adr-compliance` command exists under the `pre-commit` section and is configured to run `verify-adr-compliance.ts`.

## Acceptance Criteria
- [x] Verify `lefthook.yml` contains `adr-compliance`.
