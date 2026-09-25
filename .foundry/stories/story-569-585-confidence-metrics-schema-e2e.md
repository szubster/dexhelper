---
id: story-569-585-confidence-metrics-schema-e2e
type: STORY
title: Integration and E2E Verification for Confidence Metrics Schema
status: READY
owner_persona: tech_lead
created_at: '2026-09-20'
updated_at: '2026-09-25'
depends_on:
  - story-569-584-confidence-metrics-schema
jules_session_id: null
pr_number: null
parent: epic-565-569-agent-confidence-metrics-schema
tags:
  - schema
  - foundry
  - e2e
  - integration
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# Integration and E2E Verification for Confidence Metrics Schema

## Context
This is an exclusive STORY dedicated to Integration and E2E Verification for the Agent Confidence Metrics Schema Updates, generated to satisfy the Orchestrator Safeguard (EPIC Decomposition) requirement.

## Requirements
- Verify that tools and linters validating the `.foundry/docs/schema.md` schema are updated to recognize the new optional `confidence_score` property.
- Implement tests to validate the `confidence_score` is an integer constraint (0-100).

## Acceptance Criteria
- [ ] Decompose into tasks.
