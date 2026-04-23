---
id: epic-010-human-schema
type: EPIC
title: "Update Foundry Schema for Human Persona"
status: "ACTIVE"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: "6351331001813296049"
parent: ".foundry/prds/prd-004-human-in-the-loop.md"
tags:
  - "human-in-the-loop"
  - "schema"
---

# Epic 010: Update Foundry Schema for Human Persona

## 1. Goal
Extend the Foundry Master Schema to formally support human ownership of tasks, bypassing the standard Jules autonomous execution loop.

## 2. Background
According to `PRD-004`, there are tasks that require human intervention (e.g. subjective UX design, testing on real hardware). We need to represent these tasks within the DAG to maintain a single source of truth for repository progress. This requires adding a new `owner_persona` and a way to optionally link tasks to human-opened Pull Requests.

## 3. Scope
This Epic is solely responsible for defining the structural rules and constraints within `.foundry/docs/schema.md`. No orchestrator logic will be modified in this Epic.

## 4. Acceptance Criteria
- [ ] The `owner_persona` enum in `.foundry/docs/schema.md` includes `human`.
- [ ] A new optional global frontmatter field `pr_number` is defined. It should be described as an integer or null, defaulting to null.
- [ ] The schema explicitly notes that tasks owned by `human` bypass Jules dispatch and heartbeat failure timeouts.

## 5. Implementation Notes
- Modify `.foundry/docs/schema.md`.
- Ensure changes are communicated clearly so the orchestrator developers (in subsequent Epics) have a strict contract to follow.
