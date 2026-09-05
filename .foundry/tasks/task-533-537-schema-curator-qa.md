---
id: task-533-537-schema-curator-qa
type: TASK
title: QA - Update schema.md with Curator persona
status: READY
owner_persona: qa
created_at: '2026-09-05'
updated_at: '2026-09-05'
depends_on:
  - task-533-536-schema-curator-coder
jules_session_id: null
parent: story-530-533-schema-curator-persona
tags:
  - foundry
  - personas
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA - Update schema.md with Curator persona

## Summary
Verify the changes made in `.foundry/docs/schema.md` to register the `curator` persona.

## Context
This task verifies the work done in `task-533-536-schema-curator-coder`.

## Acceptance Criteria
- [ ] Verify `curator` persona is added to the Owner Persona Enum table in `.foundry/docs/schema.md`.
- [ ] Verify the description matches "Guardian of Code Quality".
- [ ] Verify the mapping is to Persian (#053) and Kadabra (#064).
