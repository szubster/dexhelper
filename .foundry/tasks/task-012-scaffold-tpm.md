---
id: task-012-scaffold-tpm
type: TASK
title: "Scaffold TPM Persona"
status: COMPLETED
owner_persona: tech_lead
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on:
  - .foundry/stories/story-002-personas.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-002-personas.md
---

# Scaffold TPM Persona

The TPM agent runs hourly, archives COMPLETED nodes, resolves minor deadlocks, and manages journals.

## Acceptance Criteria
- [x] Create `.github/agents/tpm.md`
- [x] Ensure it instructs the agent to explicitly read all documents under `.foundry/docs/` and `.foundry/docs/adrs/` when they begin their session to establish their context! Ensure they are aware of the rules in `.foundry/docs/adrs/001-the-foundry-architecture.md`.