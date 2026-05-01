---
id: idea-011-researcher-persona
type: IDEA
title: "Introduce Researcher Persona"
status: READY
owner_persona: product_manager
created_at: "2026-04-30"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
parent: null
tags: ["foundry", "persona", "research"]
notes: ""
---

# Idea: Introduce Researcher Persona

## Context
Foundry agents currently operate sequentially or parallelize execution tasks. However, context gathering or deep dives into particular architectural decisions or new tech stacks often lack a dedicated workflow.

## Proposal
Introduce a `researcher` persona within the Foundry system.
- The researcher will be spawned for exploratory tasks or specifically invoked to write research reports.
- It will provide critical context for downstream steps.
- We need the ability to attach multiple specific research tasks for each step in the Foundry DAG (e.g. `STORY` -> multiple `TASK`s where some are research-specific).

## Impact
Better context injection for implementation steps, higher quality PRDs and Epics, and reduced context-switching overhead for implementation personas.

Child PRD: .foundry/prds/prd-011-009-researcher-persona.md
