---
id: task-490-704-orchestrator-badge-injection-impl-v3
type: TASK
title: Orchestrator Badge Injection Implementation (v3)
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-18'
depends_on:
  - research-490-703-investigate-badge-injection-failure-v2
jules_session_id: null
parent: story-408-490-orchestrator-themed-output-impl
locks: []
---
# Orchestrator Badge Injection Implementation (v3)

## Objective
Implement logic in the Foundry Orchestrator script to map node statuses and personas to Pokemon Gen 1 themed emoji badges, based on the findings from the research node.

## Details
Modify `.github/scripts/foundry-orchestrator.ts` to render emoji badges for personas and state transitions, addressing the issues found in the previous failed task.

## Acceptance Criteria
- [ ] Coder: Implement badge injection logic as guided by the research findings.
- [ ] Coder: Ensure changes do not break action summary outputs.
