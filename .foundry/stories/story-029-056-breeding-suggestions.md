---
id: story-029-056-breeding-suggestions
type: STORY
title: 'Story: Breeding Suggestions'
status: READY
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-16'
depends_on:
  - .foundry/stories/story-029-054-gen2-strategy-plugin.md
jules_session_id: null
pr_number: null
parent: .foundry/epics/epic-017-029-strategy-engine-adaptations.md
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Breeding Suggestions

## Description
Detect compatible parents in the PC/Party and suggest breeding for missing baby evolutions (e.g., Pichu, Cleffa) in Gen 2.

## Acceptance Criteria
- [ ] The suggestion engine detects compatible parents for breeding in the PC and Party.
- [ ] Suggestions are generated for missing baby evolutions if compatible parents exist.
- [ ] Tests verify the breeding detection logic and suggestions.
