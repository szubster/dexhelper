---
id: epic-565-569-agent-confidence-metrics-schema
type: EPIC
title: Implement Node Schema Updates for Confidence Metrics
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-17T01:15:33Z'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: '17690793720619744993'
pr_number: null
parent: prd-521-565-agent-confidence-metrics-dashboard
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

# Implement Node Schema Updates for Confidence Metrics

## Context
Based on PRD-521, we need to allow agents to self-report their confidence levels. This Epic focuses on updating the Foundry schema definition to formally support a `confidence_score` (0-100) property in node frontmatter.

## Requirements
- Update `.foundry/docs/schema.md` to define the `confidence_score` property for task nodes.
- Validate that the integer constraint (0-100) is documented.
- (Implicit) Ensure tools/linters validating this schema are aware of the new optional field.

## Acceptance Criteria
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
