---
id: task-443-489-implement-gen2-decorations-e2e
type: TASK
title: Implement Gen 2 Decorations E2E Tests
status: ACTIVE
owner_persona: coder
created_at: '2026-08-25'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: '8542103052880498478'
pr_number: null
parent: story-311-443-gen2-decoration-savings-e2e
tags:
  - gen2
  - e2e
  - playwright
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 2 Decorations E2E Tests

## Overview
Implement Playwright E2E tests for Gen 2 room decorations (bed, carpet, plant, poster, console, plushies) to ensure they are fetched and interpreted correctly.

## Requirements
- Write Playwright tests verifying the presentation of Gen 2 decorations.
- Use `initializeWithSave(page)` to hydrate state.
- Call `await waitForSync(page)` after navigation to ensure IndexedDB syncs complete.

## Acceptance Criteria
- [ ] Implement Gen 2 decorations E2E tests
