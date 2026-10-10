---
id: task-639-678-migrate-inputs-leds-impl-v3
type: TASK
title: Migrate Tactical Inputs and LEDs Implementation (v3)
status: READY
owner_persona: coder
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on:
  - research-639-675-investigate-primitives-migration-failures-v2
jules_session_id: null
pr_number: null
parent: story-527-639-migrate-tactical-primitives
tags:
  - react
  - components
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Migrate Tactical Inputs and LEDs Implementation (v3)

## Objective
Migrate input and LED UI components (TacticalInput, TacticalFileInput, TacticalLed) and their tests from `src/components` to the `@dexhelper/ui` package, applying the necessary fixes from the research task.

## Acceptance Criteria
- [ ] Move `TacticalInput`, `TacticalFileInput`, and `TacticalLed` to `@dexhelper/ui`.
- [ ] Move associated test files and ensure they pass.
- [ ] Update imports across the application to consume these components from `@dexhelper/ui`.
