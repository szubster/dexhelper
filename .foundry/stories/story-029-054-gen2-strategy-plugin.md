---
id: story-029-054-gen2-strategy-plugin
type: STORY
title: 'Story: Gen 2 Strategy Plugin'
status: READY
owner_persona: tech_lead
created_at: '2026-05-16'
updated_at: '2026-05-16'
depends_on:
  - .foundry/stories/story-028-045-cross-region-distance.md
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

# Story: Gen 2 Strategy Plugin

## Description
Create the Gen 2 strategy plugin conforming to `AssistantStrategy` to handle Gen 2 specific suggestions, including time-based and breeding mechanics. This strategy will serve as the core of the Gen 2 Assistant suggestions.

## Acceptance Criteria
- [ ] Gen 2 strategy plugin (`gen2Strategy.ts`) is created.
- [ ] The plugin correctly implements the `AssistantStrategy` interface.
- [ ] The plugin integrates with `suggestionEngine.ts` to provide Gen 2 specific suggestions (time-based, breeding, headbutt/rock smash, roamers).
- [ ] Relevant tests for the new strategy are written and pass.
