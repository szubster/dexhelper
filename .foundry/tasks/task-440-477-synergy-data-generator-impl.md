---
id: task-440-477-synergy-data-generator-impl
type: TASK
title: Synergy Data Generator Implementation
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

# Synergy Data Generator Implementation

## Context
To support cross-save synergy evaluation, we need a data generator that structures data from multiple save states into a unified, coherent data payload for the suggestion engine.

## Requirements
- Create a utility function to aggregate state from multiple loaded games.
- Format the aggregated state into a structured data payload that highlights potential trade opportunities.

## Acceptance Criteria
- [x] Implement the data generator utility.
- [x] Write unit tests for the data generator logic.
