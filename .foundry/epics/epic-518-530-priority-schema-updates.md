---
id: epic-518-530-priority-schema-updates
type: EPIC
title: Implement Priority Field in Schema
status: ACTIVE
owner_persona: story_owner
created_at: '2026-09-04'
updated_at: '2026-09-05'
depends_on: []
jules_session_id: '15228761321302375862'
pr_number: null
parent: prd-148-518-priority-based-dispatch-queue
tags:
  - orchestrator
  - schema
  - types
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Implement Priority Field in Schema

## Context
As defined in PRD `prd-148-518-priority-based-dispatch-queue`, we need to introduce an optional `priority` field to nodes to allow critical items to be processed first by the orchestrator.

## Functional Requirements
- Update `NodeFrontmatterSchema` in `.github/scripts/schema.ts` to include an optional `priority` field (integer type).
- Update `.foundry/docs/schema.md` to document this new field with a default of 0.

## Acceptance Criteria
- [x] Story Owner: Break down into tasks/stories to implement schema updates.
- [x] A final STORY is created exclusively for Integration and E2E Verification (tagged with `e2e` or `integration`).
- [ ] story-530-550-implement-schema-priority
- [ ] story-530-551-integration-e2e-verification
