---
id: task-406-640-gen3-rematch-qa-retry
type: TASK
title: QA Gen 3 NPC Rematch Status Implementation (Retry)
status: ACTIVE
owner_persona: qa
created_at: '2026-09-22'
updated_at: '2026-10-04'
depends_on:
  - task-406-639-gen3-rematch-e2e-impl-retry
jules_session_id: '820901120004765267'
pr_number: null
parent: story-397-406-gen3-npc-rematch-status
tags:
  - task
  - gen3
  - rematch
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# TASK: QA Gen 3 NPC Rematch Status Implementation (Retry)

## Context
QA Verification for the Gen 3 NPC Rematch Status implementation. This ensures all components work together and follow the strict architectural and parsing guidelines, specifically verifying the retried E2E tests.

## Objectives
- Review the implemented parsing logic for adherence to Section 13 (no magic numbers, proper module-level constants, RangeError handling).
- Review the UI implementation for adherence to ADR 008 (sharp edges, dashed borders, monospaced fonts).
- Confirm E2E and unit tests cover the new logic and pass reliably.

## Acceptance Criteria
- [ ] Verify the parser implementation.
- [ ] Verify the UI implementation.
- [ ] Ensure E2E tests run successfully.
