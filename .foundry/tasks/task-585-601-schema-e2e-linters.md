---
id: task-585-601-schema-e2e-linters
type: TASK
title: Update Linters for Confidence Metrics Schema
status: READY
owner_persona: coder
created_at: '2026-09-25'
updated_at: '2026-09-25'
depends_on:
  - story-569-584-confidence-metrics-schema
jules_session_id: null
pr_number: null
parent: story-569-585-confidence-metrics-schema-e2e
tags:
  - schema
  - foundry
  - e2e
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Update Linters for Confidence Metrics Schema

## Context
Tools and linters validating `.foundry/docs/schema.md` schema need to be updated to recognize the new optional `confidence_score` property.

## Requirements
- Identify tools and linters validating the `.foundry/docs/schema.md` schema.
- Update tools and linters to recognize the new optional `confidence_score` property.

## Acceptance Criteria
- [ ] Tools and linters are updated to recognize the new optional `confidence_score` property.
