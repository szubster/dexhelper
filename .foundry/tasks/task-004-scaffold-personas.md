---
id: task-004-scaffold-personas
type: TASK
title: "Scaffold Persona Markdown Files"
status: READY
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-002-personas.md
---

# Scaffold Persona Markdown Files

We need to inject persona-specific instructions into the Jules environment based on the `owner_persona` field.

## Acceptance Criteria
- [ ] Create `.github/agents/tech_lead.md`
- [ ] Create `.github/agents/coder.md`
- [ ] Create `.github/agents/qa.md`
- [ ] Create `.github/agents/product_manager.md`
- [ ] Create `.github/agents/epic_planner.md`
- [ ] Create `.github/agents/story_owner.md`
- [ ] Create `.github/agents/tpm.md`
- [ ] Create `.github/agents/agile_coach.md`
- [ ] Each of these files MUST instruct the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.