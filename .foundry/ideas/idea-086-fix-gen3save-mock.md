---
id: idea-086-fix-gen3save-mock
type: IDEA
title: Fix isGen3Save heuristic mock for E2E tests
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-25T00:00:00.000Z'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '17902487051917676769'
locks: []
rejection_reason: ''
---

## Context
The `isGen3Save` heuristic currently mocks returning `false`, causing E2E tests on Gen 3 to require a bypass mechanism. This technical debt needs to be addressed.

## Acceptance Criteria
- [x] Break down into PRD
- [ ] prd-086-520-fix-gen3save-mock
