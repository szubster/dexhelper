---
id: task-440-582-synergy-assistant-integration-impl-v2
type: TASK
title: Synergy Assistant Integration Implementation v2
status: READY
owner_persona: coder
created_at: '2026-09-15T17:42:01Z'
updated_at: '2026-09-15T17:42:01Z'
depends_on:
  - research-440-581-investigate-synergy-integration-failure
jules_session_id: null
pr_number: null
parent: story-350-440-synergy-evaluator-assistant-prompting
tags:
  - backend
  - assistant
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Synergy Assistant Integration Implementation v2

## Context
With the data generator implemented, we need to integrate it into the assistant engine so the suggestion engine can receive the multi-save context and generate evaluations. This is a retry of a previously failed implementation.

## Requirements
- Review findings from research-440-581-investigate-synergy-integration-failure.
- Integrate the data generator into the assistant's evaluation workflow.
- Ensure the assistant suggestion engine is called with the newly generated multi-save payload.
- Handle the suggestion engine's response to extract and present trade synergy recommendations.

## Acceptance Criteria
- [ ] Integrate the data generator with the assistant engine based on research findings.
- [ ] Write unit tests to verify the integration workflow.
