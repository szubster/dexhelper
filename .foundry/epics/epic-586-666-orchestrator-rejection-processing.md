---
id: epic-586-666-orchestrator-rejection-processing
type: EPIC
title: Orchestrator Rejection Processing Update
status: PENDING
owner_persona: story_owner
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on:
  - adr-586-665-false-permanent-failure-tracking
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
tags:
  - orchestrator
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Epic: Orchestrator Rejection Processing Update

## Objective
Modify the Orchestrator's rejection processing (Phase 3.0) to parse termination states (`NOT_FOUND`, `INTERNAL_ERROR`, etc.) from session transcripts/commit logs and differentiate handling and limits for system vs. domain failures.

## Acceptance Criteria
- [ ] Modify Phase 3.0 of Orchestrator rejection processing.
- [ ] Parse termination states from logs.
- [ ] Differentiate resurrection limits for system vs domain failures.
- [ ] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.
