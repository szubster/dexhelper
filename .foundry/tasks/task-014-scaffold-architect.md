---
id: task-014-scaffold-architect
type: TASK
title: "Scaffold Architect Persona"
status: "COMPLETED"
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/stories/story-003-dynamic-verification.md
jules_session_id: null
parent: .foundry/stories/story-003-dynamic-verification.md
---

# Scaffold Architect Persona

The Architect maintains system-wide technical integrity, including ADRs, Schema, and App Architecture.

## Acceptance Criteria
- [x] Create `.github/agents/architect.md`
- [x] Ensure the prompt instructs the agent to maintain ADRs and Schemas.
- [x] Ensure the prompt instructs the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context. Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.
