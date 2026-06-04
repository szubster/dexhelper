---
id: story-029-054-gen2-strategy-plugin
type: STORY
title: 'Story: Gen 2 Strategy Plugin'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-17'
depends_on:
  - story-028-045-cross-region-distance
jules_session_id: null
pr_number: null
parent: epic-017-029-strategy-engine-adaptations
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Gen 2 Strategy Plugin

## Description
Create the Gen 2 strategy plugin conforming to `AssistantStrategy` to handle Gen 2 specific suggestions, including time-based and breeding mechanics. This strategy will serve as the core of the Gen 2 Assistant suggestions.

## Acceptance Criteria
- [x] Gen 2 strategy plugin (`gen2Strategy.ts`) is created.
- [x] The plugin correctly implements the `AssistantStrategy` interface.
- [x] The plugin integrates with `suggestionEngine.ts` to provide Gen 2 specific suggestions (time-based, breeding, headbutt/rock smash, roamers).
- [x] Relevant tests for the new strategy are written and pass.

## Children
- [.foundry/tasks/task-054-092-implement-gen2-strategy-plugin.md](.foundry/archive/tasks/task-054-092-implement-gen2-strategy-plugin.md)
- [.foundry/tasks/task-054-093-qa-gen2-strategy-plugin.md](.foundry/archive/tasks/task-054-093-qa-gen2-strategy-plugin.md)
