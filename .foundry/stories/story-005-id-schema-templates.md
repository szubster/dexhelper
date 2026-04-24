---
id: story-005-id-schema-templates
type: STORY
title: "Update Templates and Generation Scripts"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on:
  - .foundry/archive/stories/story-004-id-schema-decision.md
jules_session_id: "9741922439502902273"
parent: .foundry/archive/epics/epic-004-distributed-id-schema.md
---

# Story: Update Templates and Generation Scripts

## Goal
Implement the new collision-free ID schema across the orchestrator and all node generation tools.

## Requirements

1. **Template Updates**
   - Update any boilerplate node templates or generation scripts (used by personas like `story_owner`, `epic_planner`, `agile_coach` or the orchestrator) to automatically output the new ID format.
   - This ensures that any new nodes created in the system follow the new schema correctly from day one.

2. **Orchestrator Validation**
   - Update the orchestrator validation logic or schema definitions if needed to parse and accept the new ID format properly, avoiding strict sequential numbering checks.

## Definition of Done
- Boilerplate templates and generation scripts output the new ID format automatically.
- The orchestrator continues to function correctly with the newly formatted IDs.
