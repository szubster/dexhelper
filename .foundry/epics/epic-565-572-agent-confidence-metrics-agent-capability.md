---
id: epic-565-572-agent-confidence-metrics-agent-capability
type: EPIC
title: Implement Agent Capability for Confidence Metrics
status: PENDING
owner_persona: story_owner
created_at: '2026-09-17T01:15:33Z'
updated_at: '2026-09-17T01:15:33Z'
depends_on:
  - epic-565-569-agent-confidence-metrics-schema
jules_session_id: null
pr_number: null
parent: prd-521-565-agent-confidence-metrics-dashboard
priority: 60
tags:
  - prompt
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Agent Capability for Confidence Metrics

## Context
Based on PRD-521, agents need to be instructed on how to report their confidence scores.

## Requirements
- Define a mechanism to instruct agents (`coder` and `qa` specifically).
- This might involve updating core policies or prompt files to ensure they know when and how to update the `confidence_score` frontmatter.

## Acceptance Criteria
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
