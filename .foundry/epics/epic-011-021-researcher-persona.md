---
id: epic-011-021-researcher-persona
type: EPIC
title: "Epic: Implement Researcher Persona Workflow"
status: "COMPLETED"
owner_persona: "epic_planner"
created_at: "2026-05-01"
updated_at: "2026-05-02"
depends_on: []
jules_session_id: null
pr_number: null
parent: "prd-011-009-researcher-persona"
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
- [x] Add the `researcher` persona to the GitHub agents list.
- [x] Create a `researcher.md` prompt framework in `.github/agents/`.
- [x] Create a `researcher.md` journal policy/file in `.foundry/journals/`.
- [x] Create a dedicated storage directory `.foundry/research/` for research output nodes.
- [x] Update `foundry-orchestrator.ts` to include `research_references` in `FoundryFrontmatter`.
- [x] Implement logic in `foundry-engine.yml` so every agent automatically retrieves the paths of research references from its parent chain safely (via environment variables and `gray-matter`) and injects them into the agent's context so the agent can read them.
