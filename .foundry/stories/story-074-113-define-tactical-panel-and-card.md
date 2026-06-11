---
id: story-074-113-define-tactical-panel-and-card
type: STORY
title: Define tactical-panel and tactical-card utilities
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: '2014117752626600383'
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

# Story: Define tactical-panel and tactical-card utilities

## Objective
Extract and consolidate common, repetitive Tailwind class patterns used for panels and cards throughout `src/components/` into semantic custom utilities using Tailwind v4's native `@utility` directive in `src/index.css`.

## Scope
1. **Analyze existing codebase**: Identify repetitive tactical styling patterns for panels and cards (e.g., dashed borders, sharp corners, dark backgrounds).
2. **Define Utilities**: Create `@utility tactical-panel` and `@utility tactical-card` in `src/index.css`.
3. **Verify Compliance**: Ensure custom utilities correctly use `@apply` or raw CSS to define the desired baseline "tactical hardware" aesthetic as dictated by ADR 024. Ensure hover and focus states can be correctly inherited natively through v4's directive structure.

## Acceptance Criteria
- [ ] Appropriate `@utility tactical-panel` and `@utility tactical-card` primitives are defined in `src/index.css`.
- [ ] Tailwind v4 formatting and structure is respected.
