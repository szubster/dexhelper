---
id: story-096-153-max-rejection-cancellation
type: STORY
title: Max Rejection Cancellation
status: READY
owner_persona: tech_lead
created_at: '2026-06-20'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-052-096-automated-max-rejection-cancellation
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Max Rejection Cancellation

## Acceptance Criteria
- [ ] Break down into Tasks.
- [ ] Update `foundry-orchestrator.ts` so that when a node is evaluated and `status === 'FAILED'`, if `rejection_count >= MAX_REJECTION_THRESHOLD`, its status changes to `CANCELLED`.
