---
id: task-440-477-synergy-prompt-builder-impl
type: TASK
title: Synergy Prompt Builder Implementation
status: READY
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-350-440-synergy-evaluator-assistant-prompting
tags:
  - backend
  - assistant
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Synergy Prompt Builder Implementation

## Context
To support cross-save synergy evaluation, we need a prompt builder that structures data from multiple save states into a unified, coherent context for the assistant.

## Requirements
- Create a utility function to aggregate state from multiple loaded games.
- Format the aggregated state into a structured prompt string that highlights potential trade opportunities (e.g., version exclusives, missing evolution items).

## Acceptance Criteria
- [ ] Implement the prompt builder utility.
- [ ] Write unit tests for the prompt builder logic.
