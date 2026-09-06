---
id: task-512-517-implement-idempotent-bypass
type: TASK
title: Implement Idempotent Orchestrator Bypass
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-018-512-idempotent-orchestrator-bypass
tags:
  - orchestrator
  - typescript
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Implement Idempotent Orchestrator Bypass

## Objective
Update Phase 4.5 in `.github/scripts/foundry-orchestrator.ts` to intelligently auto-check non-node acceptance criteria.

## Details
- In `.github/scripts/foundry-orchestrator.ts`, within Phase 4.5 ("IDEMPOTENT GENERATION CHECK").
- If `shouldBypass` evaluates to true (meaning child target artifacts exist), the orchestrator must parse the markdown body and check off any `[ ]` tasks that do NOT contain a foundry node link (e.g., `- [ ] Break down into Stories`).
- We can use a regex to identify checkboxes that don't match the standard foundry link format.
- After checking them off, update the node's markdown body.
- Re-evaluate `hasUncheckedTasks` after this process.
- If remaining unchecked tasks exist, the node should be promoted to READY.
- If all tasks are checked, it should bypass dispatch and auto-fulfill (promoting to COMPLETED).

## Acceptance Criteria
- [ ] Phase 4.5 automatically checks off non-node checkboxes.
- [ ] Nodes with only non-node checkboxes are auto-fulfilled and bypass dispatch.
