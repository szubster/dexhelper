---
id: task-443-477-prompt-fragment-schema-types
type: TASK
title: Define Prompt Fragment TypeScript Interfaces and Markdown Frontmatter Schema
status: READY
owner_persona: coder
created_at: '2025-01-24'
updated_at: '2025-01-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-417-443-prompt-fragment-schema
tags:
  - foundry
  - orchestrator
  - prompts
  - types
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Define Prompt Fragment TypeScript Interfaces and Markdown Frontmatter Schema

## Description
Design and define the TypeScript interfaces and types for prompt fragments, as well as the Markdown Frontmatter schema representing a prompt fragment. A prompt fragment should specify its role, context, tech stack rules, and precedence.

## Scope
- Create a `PromptFragment` Markdown Frontmatter schema and export the inferred TypeScript type.
- The schema should include fields like `id`, `role`, `context`, `rules` (tech stack rules), and `precedence` (to determine ordering or overwriting).
- Ensure it can be integrated with the orchestrator.
- Add unit tests for the schema parsing.

## Acceptance Criteria
- [ ] Define the `PromptFragment` Markdown Frontmatter schema and TypeScript interface.
- [ ] Add unit tests for schema validation (both valid and invalid fragments).
- [ ] Ensure `precedence`, `role`, `context`, and `rules` fields are well-defined.
