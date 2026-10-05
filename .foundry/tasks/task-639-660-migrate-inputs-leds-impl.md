---
id: task-639-660-migrate-inputs-leds-impl
type: TASK
title: Migrate Tactical Inputs and LEDs Implementation
status: READY
owner_persona: coder
created_at: '2026-10-03'
updated_at: '2026-10-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-527-639-migrate-tactical-primitives
tags:
  - react
  - components
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Tactical Inputs and LEDs Implementation

## Objective
Migrate input and LED UI components (TacticalInput, TacticalFileInput, TacticalLed) and their tests from `src/components` to the `@dexhelper/ui` package.

## Acceptance Criteria
- [ ] Move `TacticalInput`, `TacticalFileInput`, and `TacticalLed` to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.
