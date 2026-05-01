---
id: prd-011-009-researcher-persona
type: PRD
title: "PRD: Introduce Researcher Persona"
status: PENDING
owner_persona: "architect"
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/ideas/idea-011-researcher-persona.md"
tags: ["foundry", "persona", "research"]
notes: ""
---

# PRD: Introduce Researcher Persona

## Problem Statement
Currently, Foundry agents lack a dedicated workflow for deep context gathering or exploring new architectural decisions. This causes downstream agents to switch context frequently and results in lower quality execution steps.

## Proposed Solution
Introduce a new `researcher` persona to the Foundry system. This persona will be responsible for exploratory tasks and writing context-rich research reports to be used by downstream pipeline nodes. We need to be able to attach these research tasks to existing node workflows.

## Acceptance Criteria
- [ ] Add the `researcher` persona to the GitHub agents list.
- [ ] Create a `researcher.md` prompt framework in `.github/agents/`.
- [ ] Create a `researcher.md` journal policy/file in `.foundry/journals/`.
- [ ] Update the system schema (`.foundry/docs/schema.md`) to include the new persona and its responsibilities.
- [ ] Implement the ability to attach research nodes (TASKs) as explicit dependencies for implementation TASKs to inject context safely into the DAG.
