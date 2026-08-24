---
id: task-440-478-synergy-assistant-integration-impl
type: TASK
title: Synergy Assistant Integration Implementation
status: READY
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on:
  - task-440-477-synergy-prompt-builder-impl
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

# Synergy Assistant Integration Implementation

## Context
With the prompt builder implemented, we need to integrate it into the assistant engine so the assistant can receive the multi-save context and generate evaluations.

## Requirements
- Integrate the prompt builder into the assistant's evaluation workflow.
- Ensure the assistant API is called with the newly generated multi-save prompt.
- Handle the assistant's response to extract and present trade synergy recommendations.

## Acceptance Criteria
- [ ] Integrate the prompt builder with the assistant engine.
- [ ] Write unit tests to verify the integration workflow.
