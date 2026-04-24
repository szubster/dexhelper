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
Implement a guidelines/warnings model for node creation per persona during late binding, guiding them via their core prompts.

## Acceptance Criteria
- [x] `architect` prompt encourages creating `TASK`, `ADR`, and `IDEA` nodes.
- [x] `tech_lead` prompt encourages creating `TASK` and `ADR` nodes.
- [x] `story_owner` prompt encourages creating `STORY` and `EPIC` nodes.
- [x] `product_manager` prompt encourages creating `IDEA`, `PRD`, and `EPIC` nodes.
- [x] These bounds are provided as soft direction and encouragement within the prompts, not enforced mechanically in the orchestrator.

## Context
See `.foundry/epics/epic-010-persona-permissions.md` and `.foundry/docs/adrs/001-the-foundry-architecture.md` for background.

### Generated Tasks
- `.foundry/tasks/task-010-024-update-persona-prompts.md`
