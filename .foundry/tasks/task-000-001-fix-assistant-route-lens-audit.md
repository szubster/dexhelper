---
id: task-000-001-fix-assistant-route-lens-audit
type: TASK
title: Fix Missing /assistant Route
status: BLOCKED
owner_persona: tpm
created_at: '2026-08-31T04:10:00.000Z'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
parent: null
rejection_count: 0
rejection_reason: '[ACKNOWLEDGED] Session timed out (>7 days without PR)'
locks: []
---

# Fix Missing `/assistant` Route

## Context
During a visual QA audit by the `lens` agent, it was discovered that the `/assistant` route is missing or broken. When navigating to `/assistant`, the application displays a generic error page, or indicates that the server is configured with a public base URL of `/dexhelper/` and suggests `/dexhelper/assistant`, but the routing appears to fail.

## Acceptance Criteria
- [x] Investigate the routing configuration for the `/assistant` endpoint.
- [x] Fix the routing issue so the assistant view loads correctly.
- [x] Add or update E2E tests to verify the assistant route is accessible.
