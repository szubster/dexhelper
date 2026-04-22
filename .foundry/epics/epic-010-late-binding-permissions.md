---
id: "epic-010-late-binding-permissions"
type: "EPIC"
title: "Epic: Late Binding Persona Permissions Matrix"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/prds/prd-002-late-binding-orchestrator.md
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags: ["v2-architecture", "permissions", "late-binding"]
---

# Epic: Late Binding Persona Permissions Matrix

## Overview
This Epic implements the dynamic node creation permissions matrix required for Late Binding Orchestration. It ensures that only authorized personas can spawn specific types of nodes during their sessions, enabling dynamic "zoom in" or "pivot" actions mid-execution while maintaining system integrity.

## Prerequisites
- Approval of PRD-002: Late Binding Epics & Recursive Orchestration (`.foundry/prds/prd-002-late-binding-orchestrator.md`)

## Acceptance Criteria
- [ ] `architect` persona is configured and verified to create `TASK`, `ADR`, and `IDEA` nodes.
- [ ] `tech_lead` persona is configured and verified to create `TASK` and `ADR` nodes.
- [ ] `story_owner` persona is configured and verified to create `STORY` and `EPIC` nodes.
- [ ] `product_manager` persona is configured and verified to create `IDEA`, `PRD`, and `EPIC` nodes.
- [ ] System documentation and schemas are updated to reflect the new dynamic permission boundaries.
