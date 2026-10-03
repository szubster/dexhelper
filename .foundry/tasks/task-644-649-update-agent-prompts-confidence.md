---
id: task-644-649-update-agent-prompts-confidence
type: TASK
title: Update Agent Prompts for Confidence Score Reporting
status: READY
owner_persona: coder
created_at: '2026-10-01T15:15:00Z'
updated_at: '2026-10-01T15:15:00Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-572-644-update-agent-prompts-for-confidence
tags:
  - prompt
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
confidence_score: 100
---

# Update Agent Prompts for Confidence Score Reporting

## Context
As part of the Agent Confidence Metrics Dashboard epic, we need to instruct agents (specifically `coder` and `qa`) on how and when to report their confidence score.

## Requirements
- Update the relevant agent prompts or core policies so they know to include a `confidence_score` (0-100) in the YAML frontmatter of the task nodes they complete or work on.

## Acceptance Criteria
- [x] Agent prompts/policies updated to include instructions for `confidence_score`.
