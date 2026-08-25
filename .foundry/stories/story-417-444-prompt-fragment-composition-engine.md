---
id: story-417-444-prompt-fragment-composition-engine
type: STORY
title: Develop Prompt Fragment Composition Engine
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-23'
updated_at: '2026-08-25'
depends_on:
  - story-417-443-prompt-fragment-schema
jules_session_id: '783063289718919723'
pr_number: null
parent: epic-343-417-prompt-fragment-layering
tags:
  - foundry
  - orchestrator
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Develop Prompt Fragment Composition Engine

## Description
This story focuses on implementing the core logic to combine and layer prompt fragments into a single cohesive payload. The engine will need to resolve precedence rules, handle overrides, and correctly inject context based on the fragments provided.

## Scope
- Implement the core logic to parse and combine multiple prompt fragments.
- Ensure precedence rules are respected during composition.
- Provide utility functions to easily generate the final composed prompt string.

## Acceptance Criteria
- [ ] Implement the core prompt fragment composition logic.
- [ ] Implement precedence and override resolution.
- [ ] Add unit tests for the composition engine.
- [x] Break down into Tasks.
- [ ] task-444-485-prompt-fragment-composition-core
- [ ] task-444-486-prompt-fragment-composition-tests
- [ ] task-444-487-prompt-fragment-composition-qa
