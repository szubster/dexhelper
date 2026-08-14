---
id: prd-137-343-decouple-persona-prompts
type: PRD
title: Decouple Persona Prompts and Support Composite Multi-Layered Prompts
status: READY
owner_persona: epic_planner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-137-decouple-persona-prompts
tags:
  - foundry
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Decouple Persona Prompts and Support Composite Multi-Layered Prompts

## 1. Context & Motivation
Currently, Foundry persona prompts are large and monolithic. Decoupling them into generic roles (e.g., Coder, QA) and highly-focused, reusable technology/context specific layers (e.g., React, TypeScript, DexHelper) combined dynamically by the orchestrator will make Foundry extremely portable across different projects and environments. We should also explore breaking personas into finer-grained specializations (e.g., splitting a monolithic role into frontend/backend or domain specific sub-personas) to scale development.

## 2. Product Requirements
- **Prompt Fragment Layering:** Introduce a system for defining prompt fragments (base roles, tech stack specifics, domain contexts) and combining them into a single coherent prompt payload.
- **Orchestrator Integration:** Update the Foundry Orchestrator to dynamically resolve and combine these prompt fragments based on node tags or context before dispatching to an agent session.
- **Finer-Grained Specializations:** Subdivide broad monolithic roles into specialized sub-personas.
- **Migration of Existing Personas:** Refactor existing monolithic `.md` prompt files into the new layered format.

## 3. Scope & Constraints
- The orchestrator must handle missing or conflicting prompt layers gracefully.
- Must remain backward compatible during the transition phase.

## 4. Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into Epics.
