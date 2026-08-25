---
id: idea-086-fix-gen3save-mock
type: IDEA
title: Fix isGen3Save heuristic mock for E2E tests
status: PENDING
owner_persona: product_manager
created_at: 2026-08-25
updated_at: 2026-08-25
depends_on: []
locks: []
---

## Context
The `isGen3Save` heuristic currently mocks returning `false`, causing E2E tests on Gen 3 to require a bypass mechanism. This technical debt needs to be addressed.

## Acceptance Criteria
- [ ] Break down into PRD
