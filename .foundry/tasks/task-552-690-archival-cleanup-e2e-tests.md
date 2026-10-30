---
id: task-552-690-archival-cleanup-e2e-tests
type: TASK
title: Archival Cleanup E2E Tests Implementation
status: COMPLETED
owner_persona: coder
created_at: '2026-10-16T00:17:43.550Z'
updated_at: '2026-10-25'
depends_on: []
jules_session_id: null
parent: story-517-552-archival-cleanup-core-e2e
tags:
  - e2e
  - typescript
rejection_reason: ''
locks: []
---

# Archival Cleanup E2E Tests Implementation

## Description
Develop the end-to-end integration test suite that verifies the core archival cleanup engine correctly implements the business rules regarding pruning, high-value node retention, and chunking limits.

## Acceptance Criteria
- [x] Implement E2E tests to verify nodes older than 90 days are correctly identified and pruned.
- [x] Implement E2E tests to verify high-value nodes (e.g., ADR, PRD, RESEARCH) are skipped and retained regardless of age.
- [x] Implement E2E tests to verify the engine respects the maximum limit of 50 deletions per run.
