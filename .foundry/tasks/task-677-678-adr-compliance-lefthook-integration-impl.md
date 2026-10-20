---
id: task-677-678-adr-compliance-lefthook-integration-impl
type: TASK
title: Implement ADR Compliance Lefthook Integration
status: READY
owner_persona: coder
created_at: '2026-10-18T19:00:00.000Z'
updated_at: '2026-10-18'
depends_on: []
parent: story-418-677-adr-compliance-lefthook-integration
jules_session_id: '3355379518708574393'
pr_number: null
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
---

# Implement ADR Compliance Lefthook Integration

## Problem Definition
To ensure code compliance before it is committed, the ADR compliance checks need to be integrated into `lefthook.yml` to run automatically as a pre-commit hook.

## Proposed Solution
- Update `lefthook.yml` to include a new pre-commit command that runs the ADR compliance script.
- The command should be named `adr-compliance` and should run `node --experimental-strip-types scripts/verify-adr-compliance.ts`.
- The command doesn't need `{staged_files}` since the script scans the whole `srcDir` internally, but can use it if we modify the script. Currently, `verify-adr-compliance.ts` doesn't accept arguments, so it will just run on the whole codebase. Let's just run it as `node --experimental-strip-types scripts/verify-adr-compliance.ts`.

## Acceptance Criteria
- [x] Update `lefthook.yml` to run `verify-adr-compliance.ts`.
