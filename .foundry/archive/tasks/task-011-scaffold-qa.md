---
id: task-011-scaffold-qa
type: TASK
title: "Scaffold QA Persona"
status: COMPLETED
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/archive/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/archive/stories/story-002-personas.md
---

# Scaffold QA Persona

The QA agent validates TASK implementation against spec.

## Acceptance Criteria
- [x] Create `.github/agents/qa.md`
- [x] Ensure it instructs the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.