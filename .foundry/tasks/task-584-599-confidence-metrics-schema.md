---
id: task-584-599-confidence-metrics-schema
type: TASK
title: Update schema.md and schema.ts with confidence_score
status: READY
owner_persona: coder
created_at: '2026-09-20'
updated_at: '2026-09-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-569-584-confidence-metrics-schema
tags:
  - schema
  - foundry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Update schema.md and schema.ts with confidence_score

## Context
Based on story-569-584-confidence-metrics-schema, we need to allow agents to self-report their confidence levels.

## Requirements
- Update `.foundry/docs/schema.md` to define the `confidence_score` property for task nodes.
- Validate that the integer constraint (0-100) is documented in `.foundry/docs/schema.md`.
- Update `.github/scripts/schema.ts` to include `confidence_score: z.number().int().min(0).max(100).optional()` in `NodeFrontmatterSchema`.

## Acceptance Criteria
- [ ] Updated schema.md with `confidence_score`.
- [ ] Updated schema.ts with `confidence_score`.
