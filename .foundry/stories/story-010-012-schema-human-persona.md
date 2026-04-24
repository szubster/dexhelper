---
id: story-010-012-schema-human-persona
type: STORY
title: "Update Foundry Schema for Human Persona"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: "4634122110197622026"
parent: ".foundry/epics/epic-010-human-schema.md"
tags:
  - "human-in-the-loop"
  - "schema"
---

# Story 012: Update Foundry Schema for Human Persona

## 1. Goal
Extend the Foundry Master Schema to formally support human ownership of tasks, bypassing the standard Jules autonomous execution loop.

## 2. Acceptance Criteria
- [ ] Update the `owner_persona` enum in `.foundry/docs/schema.md` to include `human`.
- [ ] Define a new optional global frontmatter field `pr_number` in `.foundry/docs/schema.md`. It should be described as an integer or null, defaulting to null.
- [ ] Add explicit notes in the schema that tasks owned by `human` bypass Jules dispatch and heartbeat failure timeouts.

## 3. Implementation Notes
- Modify `.foundry/docs/schema.md`.
- Ensure changes are communicated clearly so the orchestrator developers have a strict contract to follow.
