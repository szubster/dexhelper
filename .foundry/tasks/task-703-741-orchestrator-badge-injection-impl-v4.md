---
id: task-703-741-orchestrator-badge-injection-impl-v4
type: TASK
title: Orchestrator Badge Injection Implementation (v4)
status: PENDING
owner_persona: coder
created_at: '2026-11-03'
updated_at: '2026-11-03'
depends_on:
  - research-703-740-investigate-badge-injection-failure-v3
jules_session_id: null
parent: research-490-703-investigate-badge-injection-failure-v2
locks: []
rejection_reason: ''
---
# Orchestrator Badge Injection Implementation (v4)

## Objective
Implement logic in the Foundry Orchestrator script to map node statuses and personas to Pokemon Gen 1 themed emoji badges, based on the findings from the research node. This is a retry of the badge injection implementation.

## Details
Modify `.github/scripts/foundry-orchestrator.ts` to render emoji badges for personas and state transitions. Map the emojis autonomously using appropriate Gen 1 Pokemon or themed emojis, without asking for user feedback.

## Acceptance Criteria
- [ ] Coder: Implement badge injection logic as guided by the research findings.
- [ ] Coder: Ensure changes do not break action summary outputs.
