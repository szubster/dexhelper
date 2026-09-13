---
id: task-516-530-prompt-resolution-tests
type: TASK
title: Write Tests for Prompt Resolution Logic
status: COMPLETED
owner_persona: coder
created_at: '2026-09-03'
updated_at: '2026-09-12'
depends_on:
  - task-516-529-context-tags-mapping-impl
jules_session_id: null
pr_number: null
parent: story-418-516-orchestrator-prompt-resolution
tags:
  - foundry
  - orchestrator
  - prompt-resolution
  - testing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Write Tests for Prompt Resolution Logic

## Description
Write Vitest unit tests for the prompt resolution logic implemented in `.github/scripts/foundry-orchestrator.ts` to ensure prompts are compiled and combined correctly.

## Acceptance Criteria
- [x] Write unit tests verifying base prompt resolution for valid and missing personas.
- [x] Write unit tests verifying context tag resolution and layer deduplication.
- [x] Write unit tests verifying that core system policies are appended properly.
