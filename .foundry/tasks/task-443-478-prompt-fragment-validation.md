---
id: task-443-478-prompt-fragment-validation
type: TASK
title: Implement Prompt Fragment Validation Utility
status: READY
owner_persona: coder
created_at: '2025-01-24'
updated_at: '2025-01-24'
depends_on:
  - task-443-477-prompt-fragment-schema-types
jules_session_id: null
pr_number: null
parent: story-417-443-prompt-fragment-schema
tags:
  - foundry
  - orchestrator
  - prompts
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Prompt Fragment Validation Utility

## Description
Implement a validation utility function to ensure that a given set of data adheres to the `PromptFragment` schema defined in `task-443-477-prompt-fragment-schema-types`. This utility will be used by the orchestrator to load and validate fragments.

## Scope
- Implement a `validatePromptFragment` (or similar) utility function using the Zod schema.
- Support detailed error reporting (e.g. Zod errors mapped to readable formats).
- Add unit tests verifying that the validation utility handles both successful validations and various failure modes correctly.

## Acceptance Criteria
- [ ] Implement the validation utility function for prompt fragments.
- [ ] Include detailed error handling/reporting for invalid fragments.
- [ ] Add comprehensive unit tests for the validation utility.
