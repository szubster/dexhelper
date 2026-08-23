---
id: task-423-470-gen3-lottery-ui-component-impl
type: TASK
title: Gen3 Lottery UI Component Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-22'
updated_at: '2026-08-23'
depends_on:
  - task-423-469-gen3-lottery-state-impl
jules_session_id: '248893402658356862'
pr_number: null
parent: story-133-423-gen3-lottery-ui-integration
tags:
  - feature
  - gen3
  - ui
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery UI Component Implementation

## Goal
Implement a UI component that displays the Gen3 lottery information to the user.

## Requirements
- Render the daily winning number.
- Display the best matching Pokémon.
- Show the corresponding prize tier.
- Adhere to the Tactical UI aesthetics defined in ADR 008 (e.g., `rounded-none`, `border-dashed`, monospaced fonts).
- Integrate the component into the appropriate view hierarchy (e.g., Dashboard or Save Details).

## Acceptance Criteria
- [ ] Implement the UI components.
- [ ] Ensure components adhere strictly to ADR 008.
- [ ] Write component tests using `vitest-browser-react` to verify rendering logic and state integration.
