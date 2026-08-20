---
id: task-420-422-schema-e2e-rule
type: TASK
title: Update Schema Documentation with E2E Rule
status: COMPLETED
owner_persona: coder
created_at: '2026-08-13'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-129-420-update-schema-e2e-rule
tags:
  - documentation
  - schema
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Schema Documentation with E2E Rule

## Context
As part of enforcing macro node functional boundaries, we need to update templates and documentation to reflect the new process changes for Epic Planners.

## Goal
Update `.foundry/docs/schema.md` to explicitly require an Integration/E2E Story for all new Epics.

## Acceptance Criteria
- [x] Add the following Orchestrator Safeguard to `.foundry/docs/schema.md` under "7. System Invariants": "When breaking down Epics, generative personas must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`), even for documentation-focused Epics. An EPIC cannot be COMPLETED without it."
