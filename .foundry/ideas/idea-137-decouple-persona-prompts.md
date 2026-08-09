---
id: idea-137-decouple-persona-prompts
type: IDEA
title: Decouple Persona Prompts and Support Composite Multi-Layered Prompts
status: READY
owner_persona: product_manager
created_at: '2026-08-10'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - orchestrator
  - architecture
rejection_reason: ''
---

# Decouple Persona Prompts and Support Composite Multi-Layered Prompts

## Description
Currently, Foundry persona prompts are large and monolithic. Decoupling them into generic roles (e.g., Coder, QA) and highly-focused, reusable technology/context specific layers (e.g., React, TypeScript, DexHelper) combined dynamically by the orchestrator will make Foundry extremely portable across different projects and environments. We should also explore breaking personas into finer-grained specializations (e.g., splitting a monolithic role into frontend/backend or domain specific sub-personas) to scale development.

## Acceptance Criteria
- [ ] Product Manager: Break down this idea into a PRD to formalize the decoupling of persona prompts and splitting of roles.
