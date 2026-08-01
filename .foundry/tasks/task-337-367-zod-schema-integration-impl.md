---
id: task-337-367-zod-schema-integration-impl
type: TASK
title: Zod Schema Integration Implementation
status: FAILED
owner_persona: coder
created_at: '2026-07-30'
updated_at: '2026-07-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-334-337-zod-schema-integration
tags: []
research_references: []
rejection_count: 1
rejection_reason: 'Schema validation for created_at and updated_at fails to gracefully handle unquoted JS Date objects.'
notes: ''
---

# Zod Schema Integration Implementation

Refactor `.github/scripts/foundry-orchestrator.ts` and other relevant orchestrator scripts to use `NodeFrontmatterSchema` from `schema.ts` for frontmatter validation.

Remove the manual validation logic (like `REQUIRED_FIELDS`, `VALID_STATUSES`, `VALID_TYPES`) in favor of Zod's `safeParse()`. Note that some scripts like `foundry-heartbeat.ts`, `remediate-zombie.ts`, `sweep-active-nodes.ts` may also need updates.

## Acceptance Criteria
- [x] Refactor `.github/scripts/foundry-orchestrator.ts` to use `NodeFrontmatterSchema`
- [x] Refactor other relevant scripts in `.github/scripts/` to use `NodeFrontmatterSchema`
