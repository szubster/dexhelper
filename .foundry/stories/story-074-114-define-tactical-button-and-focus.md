---
id: story-074-114-define-tactical-button-and-focus
type: STORY
title: Define tactical-button and tactical-focus utilities
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: '513592357775963530'
pr_number: null
parent: epic-071-074-define-tailwind-v4-utilities
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Define tactical-button and tactical-focus utilities

## Objective
Extract and consolidate common, repetitive Tailwind class patterns used for buttons and focus states throughout `src/components/` into semantic custom utilities using Tailwind v4's native `@utility` directive in `src/index.css`.

## Scope
1. **Analyze existing codebase**: Identify repetitive tactical styling patterns for buttons and focus outlines (e.g., specific colors, focus rings).
2. **Define Utilities**: Create `@utility tactical-button` and `@utility tactical-focus` in `src/index.css`.
3. **Verify Compliance**: Ensure custom utilities correctly use `@apply` or raw CSS to define the desired baseline "tactical hardware" aesthetic as dictated by ADR 024. Ensure hover and focus states can be correctly inherited natively through v4's directive structure.

## Acceptance Criteria
- [ ] Appropriate `@utility tactical-button` and `@utility tactical-focus` primitives are defined in `src/index.css`.
- [ ] Tailwind v4 formatting and structure is respected.
- [ ] task-114-165-tactical-button-focus-impl
