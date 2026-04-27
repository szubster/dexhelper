---
id: story-004-id-schema-decision
type: STORY
title: "Decide ID Schema and Update Documentation"
status: "COMPLETED"
owner_persona: tech_lead
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: .foundry/epics/epic-004-distributed-id-schema.md
---

# Story: Decide ID Schema and Update Documentation

## Goal
Collaborate with the Architect/Tech Lead to finalize the new collision-free ID schema pattern and document it across the system.

## Requirements

1. **Decision Record**
   - Choose a pattern for the ID schema (e.g., UUID-Based, Content-Hash Suffix, or Parent-Child Hierarchy).
   - This must guarantee high entropy to prevent collisions when created autonomously across parallel branches.
   - Write or update an Architectural Decision Record (ADR) capturing this choice.

2. **Schema Documentation Update**
   - Update `.foundry/docs/schema.md` to accurately reflect the new ID format.
   - Ensure the new node template and `id` field references are updated in the schema documentation.

## Definition of Done
- A new or updated ADR confirms the chosen ID pattern.
- `.foundry/docs/schema.md` accurately describes the new ID format.
- All technical contracts specify exactly how the IDs should be generated going forward.

## Generated Tasks
- .foundry/tasks/task-021-document-id-schema.md
