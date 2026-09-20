---
id: story-569-584-confidence-metrics-schema
type: STORY
title: Confidence Metrics Schema Implementation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: '3960509007889645283'
pr_number: null
parent: epic-565-569-agent-confidence-metrics-schema
tags:
  - schema
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Confidence Metrics Schema Implementation

## Context
Based on PRD-521, we need to allow agents to self-report their confidence levels.

## Requirements
- Update `.foundry/docs/schema.md` to define the `confidence_score` property for task nodes.
- Validate that the integer constraint (0-100) is documented.
- (Implicit) Ensure tools/linters validating this schema are aware of the new optional field.

## Acceptance Criteria
- [ ] Decompose into tasks.
