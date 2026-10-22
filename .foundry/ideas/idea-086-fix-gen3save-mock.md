---
id: idea-086-fix-gen3save-mock
type: IDEA
title: Fix isGen3Save heuristic mock for E2E tests
status: ACTIVE
owner_persona: auditor
created_at: '2026-08-25T00:00:00.000Z'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: '8034232954256161207'
rejection_reason: ''
locks: []
rejection_count: 1
---

## Context
The `isGen3Save` heuristic currently mocks returning `false`, causing E2E tests on Gen 3 to require a bypass mechanism. This technical debt needs to be addressed.

## Acceptance Criteria
- [x] Break down into PRD
- [x] prd-086-520-fix-gen3save-mock
