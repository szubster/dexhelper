---
id: task-513-550-schema-verifying-negative-checks-impl
type: TASK
title: Add negative pattern checks for VERIFYING state
status: PENDING
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
depends_on:
  - task-513-549-schema-verifying-positive-checks-impl
jules_session_id: null
pr_number: null
parent: story-130-513-schema-verifying-state-update-e2e
tags:
  - schema
  - verify
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Add negative pattern checks for VERIFYING state

## Description
This task updates the `scripts/verify-schema-documentation.ts` script to include negative/forbidden pattern checks regarding the VERIFYING state to prevent conflicting documentation.

## Acceptance Criteria
- [ ] The verify-schema-documentation.ts script checks for forbidden patterns regarding VERIFYING state.