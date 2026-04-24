---
id: epic-010-persona-permissions
type: EPIC
title: "Persona Permissions Matrix for Late Binding"
status: "COMPLETED"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
---

# Persona Permissions Matrix for Late Binding

## Details
Implement the system permissions necessary for different personas to dynamically create downstream nodes mid-execution. This enables "zoom in" or "pivot" actions without requiring a full upfront plan.

## Prerequisites
- Review `.foundry/docs/adrs/001-the-foundry-architecture.md` for current system architecture.

## High-level Acceptance Criteria
- [x] `architect` persona can create `TASK`, `ADR`, and `IDEA` nodes.
- [x] `tech_lead` persona can create `TASK` and `ADR` nodes to break down a Story.
- [x] `story_owner` persona can create `STORY` and `EPIC` nodes to expand requirements.
- [x] `product_manager` persona can create `IDEA`, `PRD`, and `EPIC` nodes for roadmap evolution.
- [x] System strictly enforces these permissions to prevent unauthorized node creation.

### Late Binding Update (Post-CEO Feedback)
**Note:** The requirement for "strict enforcement" (the last AC above) was vetoed during the blueprint phase. The system should instead adopt a "soft direction/encouragement" approach solely through the respective agent's persona prompt (`.github/agents/*.md`), with no mechanical enforcement in the orchestrator.

### Generated Stories
- `.foundry/stories/story-010-persona-permissions-matrix.md`
