---
type: TASK
depends_on: []
parent:
owner_persona: tech_lead
title: Fix Missing /assistant Route
status: READY
rejection_count: 0
---

# Fix Missing `/assistant` Route

## Context
During a visual QA audit by the `lens` agent, it was discovered that the `/assistant` route is missing or broken. When navigating to `/assistant`, the application displays a generic error page, or indicates that the server is configured with a public base URL of `/dexhelper/` and suggests `/dexhelper/assistant`, but the routing appears to fail.

## Acceptance Criteria
- [ ] Investigate the routing configuration for the `/assistant` endpoint.
- [ ] Fix the routing issue so the assistant view loads correctly.
- [ ] Add or update E2E tests to verify the assistant route is accessible.
