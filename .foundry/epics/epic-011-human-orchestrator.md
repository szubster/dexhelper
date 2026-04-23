---
id: epic-011-human-orchestrator
type: EPIC
title: "Bypass Jules Dispatch for Human Tasks in Orchestrator"
status: "ACTIVE"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on:
  - ".foundry/epics/epic-010-human-schema.md"
jules_session_id: "5961213059938943122"
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
  - "orchestrator"
---

# Epic 011: Bypass Jules Dispatch for Human Tasks in Orchestrator

## 1. Goal
Modify the `.github/scripts/foundry-orchestrator.ts` script so it transitions `READY` human tasks to `ACTIVE` without attempting to dispatch a Jules session.

## 2. Background
Currently, any task that reaches `READY` status is collected by the orchestrator and dispatched to a Jules agent via GitHub Actions matrix. For tasks assigned to `owner_persona: human`, we need to intercept this process. We want the orchestrator to mark the task as `ACTIVE` (so the rest of the DAG knows it's unblocked and being worked on) but avoid invoking the Jules API.

## 3. Scope
- Updates to `foundry-orchestrator.ts` logic.
- Associated unit tests in `foundry-orchestrator.test.ts`.

## 4. Acceptance Criteria
- [ ] The orchestrator detects `owner_persona: human` for nodes moving from `READY` to `ACTIVE`.
- [ ] Nodes with `human` persona transition to `ACTIVE` but are explicitly omitted from the GitHub Actions dispatch JSON output.
- [ ] Unit tests cover the human bypass scenario.

## 5. Implementation Notes
- Human nodes will still be tracked in the broader DAG resolution loop, they just take a different path at the exact moment of dispatch.
- Ensure backwards compatibility with all other agent personas.
