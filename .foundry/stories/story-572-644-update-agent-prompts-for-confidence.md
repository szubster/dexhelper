---
id: story-572-644-update-agent-prompts-for-confidence
type: STORY
title: Update Agent Prompts for Confidence Score Reporting
status: READY
owner_persona: tech_lead
created_at: '2026-10-01T15:12:11Z'
updated_at: '2026-10-01T15:12:11Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-565-572-agent-confidence-metrics-agent-capability
tags:
  - prompt
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Update Agent Prompts for Confidence Score Reporting

## Context
As part of the Agent Confidence Metrics Dashboard epic, we need to instruct agents (specifically `coder` and `qa`) on how and when to report their confidence score.

## Requirements
- Update the relevant agent prompts or core policies so they know to include a `confidence_score` (0-100) in the YAML frontmatter of the task nodes they complete or work on.

## Acceptance Criteria
- [ ] Break down into Tasks
