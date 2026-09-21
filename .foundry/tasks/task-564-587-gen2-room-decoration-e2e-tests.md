---
id: task-564-587-gen2-room-decoration-e2e-tests
type: TASK
title: Gen 2 Room Decoration E2E Tests
status: FAILED
owner_persona: coder
created_at: '$(date -u +"%Y-%m-%dT%H:%M:%SZ")'
updated_at: '2026-09-21'
depends_on:
  - task-564-586-gen2-room-decoration-route-integration
jules_session_id: null
parent: story-313-564-gen2-room-decoration-integration-e2e
tags:
  - e2e
  - integration
rejection_count: 2
rejection_reason: >-
  [ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered
  AWAITING_USER_FEEDBACK
locks: []
---

# Task: Gen 2 Room Decoration E2E Tests

## Overview
Write Playwright E2E tests for the Room Decoration Viewer UI flow.

## Requirements
- Write E2E tests using Playwright to verify that the decorations load correctly when a valid Gen 2 save file is loaded.
- Verify that the categorized view renders properly and that Mystery Gift exclusives are correctly highlighted in the UI.

## Acceptance Criteria
- [ ] Write Playwright tests for decoration loading
- [ ] Verify categorized view and Mystery Gift highlights in E2E tests
