---
id: task-564-587-gen2-room-decoration-e2e-impl
type: TASK
title: Gen 2 Room Decoration E2E Tests
status: PENDING
owner_persona: coder
created_at: '2026-09-17T00:13:04Z'
updated_at: '2026-09-17T00:13:04Z'
depends_on:
  - task-564-586-gen2-room-decoration-router-integration-impl
jules_session_id: null
parent: story-313-564-gen2-room-decoration-integration-e2e
tags:
  - e2e
locks: []
rejection_reason: ''
---

# Task: Gen 2 Room Decoration E2E Tests

## Overview
Write Playwright E2E tests for the Gen 2 Room Decoration Viewer to verify rendering and interaction.

## Requirements
- Write E2E tests using Playwright to verify that the decorations load correctly when a valid Gen 2 save file is loaded.
- Verify that the categorized view renders properly and that Mystery Gift exclusives are correctly highlighted in the UI.
- Use `locator.or()` carefully according to Playwright strict mode rules.
- Test both desktop and `isMobile` contexts if applicable.

## Acceptance Criteria
- [ ] Write Playwright E2E tests for rendering valid Gen 2 saves.
- [ ] Add tests verifying categorized view and Mystery Gift highlights.
