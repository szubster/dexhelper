---
id: story-096-154-parent-awakening-logic
type: STORY
title: Parent Awakening Logic for Cancelled Nodes
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-20'
updated_at: '2026-07-11'
depends_on:
  - story-096-153-max-rejection-cancellation
jules_session_id: '9830890188519221745'
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

# Story: Parent Awakening Logic for Cancelled Nodes

## Acceptance Criteria
- [x] Break down into Tasks.
- [ ] Update Phase 3.6 of `foundry-orchestrator.ts` to expand the condition `node.frontmatter.status === 'FAILED'` to include `CANCELLED` nodes with a `rejection_reason`.
- [ ] task-154-278-update-orchestrator-phase36-cancelled-logic-impl
