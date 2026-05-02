---
id: epic-011-021-researcher-persona
type: EPIC
title: "Epic: Implement Researcher Persona Workflow"
status: "ACTIVE"
owner_persona: "epic_planner"
created_at: "2026-05-01"
updated_at: "2026-05-02"
depends_on: []
jules_session_id: "7684700597915606290"
pr_number: null
parent: ".foundry/prds/prd-011-009-researcher-persona.md"
tags: ["foundry", "persona", "research"]
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Implement Researcher Persona Workflow

## Description
This epic tracks the implementation of the new `researcher` persona and the automated extraction of `research_references` from the Foundry Engine workflow, as outlined in ADR-004.

## Acceptance Criteria
- [ ] Add the `researcher` persona to the GitHub agents list.
- [ ] Create a `researcher.md` prompt framework in `.github/agents/`.
- [ ] Create a `researcher.md` journal policy/file in `.foundry/journals/`.
- [ ] Create a dedicated storage directory `.foundry/research/` for research output nodes.
- [ ] Update `foundry-orchestrator.ts` to include `research_references` in `FoundryFrontmatter`.
- [ ] Implement logic in `foundry-engine.yml` so every agent automatically retrieves the paths of research references from its parent chain safely (via environment variables and `gray-matter`) and injects them into the agent's context so the agent can read them.
