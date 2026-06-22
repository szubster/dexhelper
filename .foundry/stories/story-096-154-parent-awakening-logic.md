---
id: story-096-154-parent-awakening-logic
type: STORY
title: Parent Awakening Logic for Cancelled Nodes
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-20'
updated_at: '2026-06-20'
depends_on:
  - story-096-153-max-rejection-cancellation
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

# Story: Parent Awakening Logic for Cancelled Nodes

## Acceptance Criteria
- [ ] Break down into Tasks.
- [ ] Update Phase 3.6 of `foundry-orchestrator.ts` to expand the condition `node.frontmatter.status === 'FAILED'` to include `CANCELLED` nodes with a `rejection_reason`.
