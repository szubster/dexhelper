---
id: story-018-512-idempotent-orchestrator-bypass
type: STORY
title: Update Idempotent Orchestrator Bypass
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-01'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: '2237892918616672278'
parent: epic-008-018-session-dispatch-bypass
tags:
  - orchestrator
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story: Update Idempotent Orchestrator Bypass

## Overview
Update Phase 4.5 in `.github/scripts/foundry-orchestrator.ts` to intelligently auto-check non-node acceptance criteria.

## Details
- When `shouldBypass` evaluates to true (meaning child target artifacts exist), the orchestrator must parse the markdown body and check off any `[ ]` tasks that do NOT contain a foundry node link (e.g., `- [ ] Break down into Stories`).
- If remaining unchecked tasks exist, the node should be promoted to READY.
- If all tasks are checked, it should bypass dispatch and auto-fulfill (promoting to COMPLETED).

## Acceptance Criteria
- [ ] task-512-517-implement-idempotent-bypass
- [ ] task-512-518-qa-idempotent-bypass
- [ ] Phase 4.5 automatically checks off non-node checkboxes.
- [ ] Nodes with only non-node checkboxes are auto-fulfilled and bypass dispatch.
