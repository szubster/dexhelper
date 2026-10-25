---
id: task-552-691-archival-cleanup-e2e-qa
type: TASK
title: QA Archival Cleanup E2E Tests
status: READY
owner_persona: qa
created_at: '2026-10-16T00:17:43.559Z'
updated_at: '2026-10-25'
depends_on:
  - task-552-690-archival-cleanup-e2e-tests
jules_session_id: null
parent: story-517-552-archival-cleanup-core-e2e
tags:
  - e2e
rejection_reason: ''
locks: []
---

# QA Archival Cleanup E2E Tests

## Description
Verify that the end-to-end integration test suite for the core archival cleanup engine accurately covers the 90-day pruning rule, high-value node retention, and 50-file chunking limits.

## Acceptance Criteria
- [x] Verify the test suite successfully and deterministically passes.
- [x] Verify the test suite covers the pruning of nodes older than 90 days.
- [x] Verify the test suite covers the retention of high-value nodes (ADR, PRD, RESEARCH).
- [x] Verify the test suite covers the deletion chunking limit (max 50 files per run).
