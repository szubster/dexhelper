---
id: story-010-persona-permissions-matrix
type: STORY
title: "Implement Persona Node Creation Permissions Matrix"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: "11165832185709609742"
parent: ".foundry/epics/epic-010-persona-permissions.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
---

# Implement Persona Node Creation Permissions Matrix

## Goal
Implement a guidelines/warnings model for node creation per persona during late binding, to gently remind agents of expected workflows.

## Acceptance Criteria
- [x] `architect` typically creates `TASK`, `ADR`, and `IDEA` nodes.
- [x] `tech_lead` typically creates `TASK` and `ADR` nodes.
- [x] `story_owner` typically creates `STORY` and `EPIC` nodes.
- [x] `product_manager` typically creates `IDEA`, `PRD`, and `EPIC` nodes.
- [x] The system orchestrator logs helpful warnings when these bounds are exceeded.
- [x] Any unusual node creation attempts log a helpful reminder but do not fail the process (non-blocking).

## Context
See `.foundry/epics/epic-010-persona-permissions.md` and `.foundry/docs/adrs/001-the-foundry-architecture.md` for background.

### Generated Tasks
- `.foundry/tasks/task-010-024-remind-persona-permissions.md`
- `.foundry/tasks/task-010-025-qa-persona-permissions-reminder.md`
