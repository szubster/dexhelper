---
id: story-010-orchestrator-human-bypass
type: STORY
title: "Implement Human Task Bypass in Orchestrator"
status: PENDING
owner_persona: tech_lead
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-011-human-orchestrator.md"
tags:
  - "human-in-the-loop"
  - "orchestrator"
---

# Story 010: Implement Human Task Bypass in Orchestrator

## 1. Goal
Implement logic in the orchestrator to intercept `human` tasks that are moving from `READY` to `ACTIVE` to avoid dispatching a Jules session.

## 2. Acceptance Criteria
- [ ] In `.github/scripts/foundry-orchestrator.ts`, detect when `owner_persona` is `human` for nodes that are in `READY` status.
- [ ] Automatically mutate the node's status to `ACTIVE` on disk.
- [ ] Explicitly omit these `human` nodes from the `readyNodes` JSON output array so GitHub Actions does not spawn a matrix runner for them.
- [ ] Add a unit test in `.github/scripts/foundry-orchestrator.test.ts` to verify this behavior.
