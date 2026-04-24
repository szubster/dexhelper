---
id: task-005-024-update-id-templates
type: TASK
title: "Update Generation Templates to Parent-Linked ID Schema"
status: READY
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-005-id-schema-templates.md
---

# Task: Update Generation Templates to Parent-Linked ID Schema

## Context
As per ADR 002, The Foundry system has transitioned to a Parent-Linked Distributed ID Schema for nodes. The new format is `<type>-<parent_NNN>-<NNN>-<slug>`, replacing the older `<type>-<NNN>-<slug>` format.

## Contract
Update all boilerplate templates and generation instructions to strictly adhere to the new schema.

## Requirements
1. **Schema Document (`.foundry/docs/schema.md`)**
   - Update the "New Node Template" section (Section 8) to explicitly reflect the new format `<type>-<parent_NNN>-<NNN>-<slug>`.
   - Ensure the field reference description for `id` under Section 3.1 accurately details this convention.

2. **Persona Prompts (`.github/agents/*.md`)**
   - Review agent prompts that generate nodes (e.g., `agile_coach.md`, `epic_planner.md`, `product_manager.md`, `story_owner.md`, `tech_lead.md`).
   - If they include explicit ID schema examples, ensure they are updated. (If they don't, no action needed, but ensure they point to `schema.md`).

3. **Orchestrator Templates (If applicable)**
   - Check if any `.ts` scripts contain hardcoded markdown templates (e.g., in `foundry-orchestrator.ts` or `foundry-heartbeat.ts`) and update them if they do.

## Acceptance Criteria
- [ ] `.foundry/docs/schema.md` properly documents the parent-linked ID format in both definitions and templates.
- [ ] Any script or agent prompt that dynamically or statically references the ID schema format reflects the `<type>-<parent_NNN>-<NNN>-<slug>` structure.
