---
id: epic-004-distributed-id-schema
type: EPIC
title: "Collision-Free ID Schema Implementation"
status: "ACTIVE"
owner_persona: story_owner
created_at: "2026-04-21"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: "16616195905422125590"
parent: .foundry/prds/prd-001-distributed-ids.md
tags: ["schema", "distributed-ids"]
rejection_count: 1
notes: ""
---

# Epic: Collision-Free ID Schema Implementation

## Overview
As part of the initiative to build a robust parallel, multi-agent environment, this epic focuses on defining and implementing a new collision-free ID and naming convention for all Foundry lifecycle nodes (IDEA, PRD, EPIC, STORY, TASK). It replaces the problematic sequential numbering system (e.g., `task-001`, `task-002`) which caused conflicts.

## Scope
1. **Decision Record:** Collaborate with the Tech Lead to finalize the ID pattern (e.g., UUID-Based, Content-Hash Suffix, or Parent-Child Hierarchy).
2. **Schema Update:** Document the chosen new collision-free ID schema in `.foundry/docs/schema.md`.
3. **Template Update:** Update the orchestrator and all node generation templates/scripts to output new nodes using the chosen ID schema.

## Dependencies
None. This epic can be implemented independently and serves as the foundation for related validation epics.

## High-Level Acceptance Criteria
- [ ] An Architectural Decision Record (ADR) or schema document update confirms the chosen ID pattern.
- [ ] `.foundry/docs/schema.md` accurately reflects the new ID format.
- [ ] Boilerplate templates and generation scripts output the new ID format automatically.
