---
id: task-444-485-prompt-fragment-composition-core
type: TASK
title: Implement Prompt Fragment Composition Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '10477875160319615407'
pr_number: null
parent: story-417-444-prompt-fragment-composition-engine
tags:
  - foundry
  - orchestrator
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Prompt Fragment Composition Logic

## Description
Implement the core prompt fragment composition engine in `.github/scripts/fragments.ts`.

## Scope
- Create `composePromptFragments` function.
- Handle precedence logic and override rules.
- Combine contexts and rules.

## Acceptance Criteria
- [ ] Implement `composePromptFragments` in `.github/scripts/fragments.ts`.
- [ ] Precedence rules correctly sort fragments descending.
- [ ] Context and rules are properly concatenated.
