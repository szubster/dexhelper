---
id: task-013-scaffold-agile-coach
type: TASK
title: "Scaffold Agile Coach Persona"
status: "COMPLETED"
rejection_count: 1
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/archive/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/archive/stories/story-002-personas.md
---

# Scaffold Agile Coach Persona

The agile coach runs daily/weekly. It is a meta-agent that modifies persona prompts and system config based on CEO rejection patterns.

## Acceptance Criteria
- [x] Create `.github/agents/agile_coach.md`
- [x] Ensure it instructs the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.