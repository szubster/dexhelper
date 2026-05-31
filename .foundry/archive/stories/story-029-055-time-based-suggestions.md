---
id: story-029-055-time-based-suggestions
type: STORY
title: 'Story: Time-Based Suggestions'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-18'
depends_on:
  - .foundry/stories/story-029-054-gen2-strategy-plugin.md
jules_session_id: '2746406269049050831'
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

# Story: Time-Based Suggestions

## Description
Implement filtering and warnings in the suggestion engine based on Morning/Day/Night cycles using RTC state, specific to Gen 2 mechanics.

## Acceptance Criteria
- [x] The suggestion engine filters encounters based on time of day (Morning/Day/Night).
- [x] Relevant UI warnings are displayed if an encounter is only available at a different time of day.
- [x] Tests verify time-based filtering logic.

## Children
- [.foundry/tasks/task-055-094-implement-time-based-suggestions.md](.foundry/tasks/task-055-094-implement-time-based-suggestions.md)
- [.foundry/tasks/task-055-095-qa-time-based-suggestions.md](.foundry/tasks/task-055-095-qa-time-based-suggestions.md)
- [.foundry/tasks/task-055-100-implement-time-based-suggestions-v2.md](.foundry/tasks/task-055-100-implement-time-based-suggestions-v2.md)
- [.foundry/tasks/task-055-101-qa-time-based-suggestions-v2.md](.foundry/tasks/task-055-101-qa-time-based-suggestions-v2.md)
