---
id: "epic-011-hitl-orchestrator-bypass"
type: "EPIC"
title: "Orchestrator Bypass for Human-in-the-Loop"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/epics/epic-010-hitl-schema-extensions.md
jules_session_id: null
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
---

# Epic 011: Orchestrator Bypass for Human-in-the-Loop

## Prerequisites
- Completion of Schema Extensions for Human-in-the-Loop (`.foundry/epics/epic-010-hitl-schema-extensions.md`).
- Understanding of the `foundry-orchestrator.ts` logic.

## Acceptance Criteria
- [ ] Update `foundry-orchestrator.ts` to identify nodes with `owner_persona: human`.
- [ ] Ensure the orchestrator marks `human` nodes as `ACTIVE` but does *not* attempt to spawn a Jules session (bypasses GitHub Actions dispatch).
- [ ] Allow humans to manually pick up `READY` tasks.
- [ ] Support manual transition to `COMPLETED` by a human if they committed directly to `main`.
- [ ] Ensure orchestrator validation enforces that a `qa` node follows human tasks to maintain system-wide standards.
- [ ] Add unit tests in `foundry-orchestrator.test.ts` to verify the bypass logic and validation.
