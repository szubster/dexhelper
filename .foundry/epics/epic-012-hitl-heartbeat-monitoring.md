---
id: "epic-012-hitl-heartbeat-monitoring"
type: "EPIC"
title: "Heartbeat Monitoring for Human-in-the-Loop"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/epics/epic-011-hitl-orchestrator-bypass.md
jules_session_id: null
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
---

# Epic 012: Heartbeat Monitoring for Human-in-the-Loop

## Prerequisites
- Completion of Orchestrator Bypass for Human-in-the-Loop (`.foundry/epics/epic-011-hitl-orchestrator-bypass.md`).
- Understanding of the `foundry-heartbeat.ts` logic.

## Acceptance Criteria
- [ ] Update `foundry-heartbeat.ts` to poll the GitHub API for PR status if a node is `ACTIVE` and has a `pr_number`.
- [ ] Automatically transition the node to `COMPLETED` if the associated PR is merged.
- [ ] Automatically transition the node to `READY` if the associated PR is closed without being merged (allowing it to be reclaimed).
- [ ] Ensure human tasks (those with `owner_persona: human`) do not expire or fail based on heartbeat loops, remaining `ACTIVE` until manually completed or the PR is merged.
- [ ] Add unit tests in `foundry-heartbeat.test.ts` to verify PR polling, completion states, and skipped timeouts.
