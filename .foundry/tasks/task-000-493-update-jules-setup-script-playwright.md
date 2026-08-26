---
type: TASK
id: task-000-493-update-jules-setup-script-playwright
title: Update Jules Setup Script with Playwright Dependencies
depends_on: []
status: PENDING
owner_persona: coder
created_at: '2026-08-26T02:00:00Z'
updated_at: '2026-08-26T02:00:00Z'
jules_session_id: 'agile_coach_session'
rejection_count: 0
rejection_reason: ""
---

# Update Jules Setup Script with Playwright Dependencies

## Context
The Agile Coach identified that agents attempting to run local Playwright E2E tests are failing because Playwright browser binaries are not installed, and attempting to install them dynamically during a session causes a timeout crash (exceeding 400s). The CEO requested the exact commands to add to the persistent Jules setup script to fix this friction.

## Requirements
- Modify the system/Jules environment setup script to explicitly install Playwright browsers and dependencies globally for the sandbox image.
- Ensure the command `pnpm exec playwright install --with-deps chromium` is executed during image generation to pre-bake the binaries.

## Acceptance Criteria
- [ ] Setup script updated to include the Playwright installation command.
