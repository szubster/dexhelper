---
id: story-335-412-integrate-zod-schema
type: STORY
title: Replace Manual Orchestrator Validation with Zod Schema
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-12'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
parent: epic-117-335-integrate-zod-orchestrator
tags:
  - foundry
  - orchestrator
  - integration
rejection_count: 0
rejection_reason: ''
---

# Replace Manual Orchestrator Validation with Zod Schema

## Description
This story focuses on refactoring `.github/scripts/foundry-orchestrator.ts` to utilize the `NodeFrontmatterSchema` from `schema.ts`. We need to replace all ad-hoc YAML type-checking and manual validation logic. Ensure the orchestrator behaves consistently using the Zod-parsed object.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-412-418-refactor-orchestrator-zod-impl
- [x] task-412-419-refactor-orchestrator-zod-qa
