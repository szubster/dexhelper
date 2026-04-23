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
Implement the strict permissions model for node creation per persona during late binding.

## Acceptance Criteria
- [ ] `architect` can create `TASK`, `ADR`, and `IDEA` nodes.
- [ ] `tech_lead` can create `TASK` and `ADR` nodes.
- [ ] `story_owner` can create `STORY` and `EPIC` nodes.
- [ ] `product_manager` can create `IDEA`, `PRD`, and `EPIC` nodes.
- [ ] The system orchestrator and pre-commit hooks enforce these bounds.
- [ ] Any unauthorized node creation attempts are cleanly rejected or failed.

## Context
See `.foundry/epics/epic-010-persona-permissions.md` and `.foundry/docs/adrs/001-the-foundry-architecture.md` for background.
