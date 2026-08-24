---
id: task-443-479-prompt-fragment-initial-fragments
type: TASK
title: Create Initial Standard Prompt Fragments
status: READY
owner_persona: coder
created_at: '2025-01-24'
updated_at: '2025-01-24'
depends_on:
  - task-443-478-prompt-fragment-validation
jules_session_id: null
pr_number: null
parent: story-417-443-prompt-fragment-schema
tags:
  - foundry
  - orchestrator
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Create Initial Standard Prompt Fragments

## Description
Create the initial foundational prompt fragments as a baseline, using the schema and validation logic defined in the previous tasks.

## Scope
- Create a directory for prompt fragments if it doesn't exist.
- Create at least 3 standard foundational fragments:
  1. Generic Coder Role
  2. React/Tailwind Tech Stack
  3. TypeScript specific rules
- Validate these fragments using the newly created validation utility (this could be as part of a build script or a test verifying they are well-formed).

## Acceptance Criteria
- [ ] Create at least 3 standard foundational prompt fragments matching the `PromptFragment` schema.
- [ ] Include "Generic Coder Role", "React/Tailwind Tech Stack", and "TypeScript specific rules".
- [ ] Create a test that loads and successfully validates these baseline fragments.
