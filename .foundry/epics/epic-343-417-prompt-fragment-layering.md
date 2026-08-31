---
id: epic-343-417-prompt-fragment-layering
type: EPIC
title: Implement Prompt Fragment Layering System
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-137-343-decouple-persona-prompts
tags:
  - foundry
  - orchestrator
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Implement Prompt Fragment Layering System

## Description
This Epic focuses on designing and implementing the foundational system for prompt fragment layering. Currently, persona prompts are monolithic files. This system will allow defining prompt fragments (e.g., base roles, tech stack specifics, domain contexts) that can be dynamically combined into a single, cohesive prompt payload.

## Scope
- Define a standard schema/format for prompt fragments.
- Implement the core logic to combine and layer these fragments, ensuring precedence rules are established.
- Create a set of initial standard fragments (e.g., generic Coder role, React tech stack, TypeScript specifics).

## Prerequisites
- No dependencies. This is the foundational epic for the decoupling effort.

## Acceptance Criteria
- [x] Develop the prompt fragment composition engine.
- [x] Define the schema for prompt fragment definition files.
- [x] Generate an exclusive STORY dedicated to Integration and E2E Verification.
- [x] story-417-443-prompt-fragment-schema
- [x] story-417-444-prompt-fragment-composition-engine
- [x] story-417-445-prompt-fragment-layering-e2e
