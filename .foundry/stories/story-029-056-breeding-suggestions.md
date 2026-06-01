---
id: story-029-056-breeding-suggestions
type: STORY
title: 'Story: Breeding Suggestions'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-18'
depends_on:
  - story-029-054-gen2-strategy-plugin
jules_session_id: '14363378023320563894'
pr_number: null
parent: epic-017-029-strategy-engine-adaptations
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Breeding Suggestions

## Description
Detect compatible parents in the PC/Party and suggest breeding for missing baby evolutions (e.g., Pichu, Cleffa) in Gen 2.

## Acceptance Criteria
- [x] The suggestion engine detects compatible parents for breeding in the PC and Party.
- [x] Suggestions are generated for missing baby evolutions if compatible parents exist.
- [x] Tests verify the breeding detection logic and suggestions.

## Children
- [.foundry/tasks/task-056-094-implement-breeding-suggestions.md](.foundry/tasks/task-056-094-implement-breeding-suggestions.md)
- [.foundry/tasks/task-056-095-qa-breeding-suggestions.md](.foundry/tasks/task-056-095-qa-breeding-suggestions.md)
