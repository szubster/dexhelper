---
id: "story-008-023-validate-single-owner"
type: "STORY"
title: "Validate Single Owner Persona in Orchestrator"
status: "PENDING"
owner_persona: "tech_lead"
created_at: "2026-04-25"
updated_at: "2026-04-25"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-008-atomic-handoff-orchestrator.md"
---

# Validate Single Owner Persona in Orchestrator

## Context
To enforce Atomic Handoffs, the orchestrator script must explicitly reject or error on files defining multiple `owner_persona`s.

## Acceptance Criteria
- [ ] The orchestrator script explicitly checks the `owner_persona` field of each node.
- [ ] If `owner_persona` is an array or contains multiple personas, the orchestrator logs an error and skips or rejects the node.
- [ ] Tests are added to verify this validation logic.
