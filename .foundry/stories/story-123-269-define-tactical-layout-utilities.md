---
id: story-123-269-define-tactical-layout-utilities
type: STORY
title: Define Tactical Layout Utilities
status: READY
owner_persona: tech_lead
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-071-123-define-tailwind-v4-utilities-v2
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Story: Define Tactical Layout Utilities

## Objective
Define the base layout-related `@utility` primitives in `src/index.css` to consolidate repetitive tactical styling.

## Scope
1. Analyze the codebase for repetitive patterns representing panels, cards, and buttons that fit the "tactical hardware" aesthetic.
2. Add `@utility` definitions in `src/index.css` for `tactical-panel`, `tactical-card`, and `tactical-button`.
3. Ensure hover and focus states are correctly handled within the utility definition using nested states or leveraging Tailwind v4's native variant inheritance.

## Acceptance Criteria
- [ ] `tactical-panel` utility is defined.
- [ ] `tactical-card` utility is defined.
- [ ] `tactical-button` utility is defined.
- [ ] task-269-272-define-tactical-layout-utilities-impl
- [ ] task-269-273-define-tactical-layout-utilities-qa

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md
