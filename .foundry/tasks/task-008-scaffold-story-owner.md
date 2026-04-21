---
id: task-008-scaffold-story-owner
type: TASK
title: "Scaffold Story Owner Persona"
status: ACTIVE
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/stories/story-002-personas.md
jules_session_id: "7669327667359482314"
pr_number: null
parent: .foundry/stories/story-002-personas.md
---

# Scaffold Story Owner Persona

The story owner monitors active epics and writes STORY nodes dynamically (late-binding).

## Acceptance Criteria
- [ ] Create `.github/agents/story_owner.md`
- [ ] Ensure it instructs the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.