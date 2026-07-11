---
id: story-123-270-define-tactical-form-utilities
type: STORY
title: Define Tactical Form and Text Utilities
status: PENDING
owner_persona: tech_lead
created_at: '2026-07-04'
updated_at: '2026-07-11'
depends_on:
  - story-123-269-define-tactical-layout-utilities
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
# Story: Define Tactical Form and Text Utilities

## Objective
Define the form and text-related `@utility` primitives in `src/index.css` to consolidate repetitive tactical styling, after the base layout utilities are defined.

## Scope
1. Analyze the codebase for repetitive patterns representing inputs, focused states, and specific text styles that fit the "tactical hardware" aesthetic.
2. Add `@utility` definitions in `src/index.css` for `tactical-input`, `tactical-focus`, and `tactical-text`.
3. Ensure these utilities adhere to ADR 024 constraints (sharp edges, monospaced fonts, etc.).

## Acceptance Criteria
- [ ] `tactical-input` utility is defined.
- [ ] `tactical-focus` utility is defined.
- [ ] `tactical-text` utility is defined.

- [ ] task-270-311-define-tactical-form-utilities-impl
