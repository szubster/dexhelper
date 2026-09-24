---
id: task-584-600-confidence-metrics-schema-qa
type: TASK
title: QA Verification for confidence_score Schema
status: READY
owner_persona: qa
created_at: '2026-09-20'
updated_at: '2026-09-21'
depends_on:
  - task-584-599-confidence-metrics-schema
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

# QA Verification for confidence_score Schema

## Context
Based on story-569-584-confidence-metrics-schema, we need to allow agents to self-report their confidence levels.

## Requirements
- Verify that `.foundry/docs/schema.md` defines the `confidence_score` property for task nodes with the integer constraint (0-100).
- Verify that `.github/scripts/schema.ts` includes `confidence_score: z.number().int().min(0).max(100).optional()` in `NodeFrontmatterSchema`.
- Verify that `pnpm test` passes for the orchestrator scripts.

## Acceptance Criteria
- [x] QA verified schema.md and schema.ts updates.
