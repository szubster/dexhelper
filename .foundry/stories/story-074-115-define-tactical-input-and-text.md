---
id: story-074-115-define-tactical-input-and-text
type: STORY
title: Define tactical-input and tactical-text utilities
status: READY
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
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

# Story: Define tactical-input and tactical-text utilities

## Objective
Extract and consolidate common, repetitive Tailwind class patterns used for inputs and text throughout `src/components/` into semantic custom utilities using Tailwind v4's native `@utility` directive in `src/index.css`.

## Scope
1. **Analyze existing codebase**: Identify repetitive tactical styling patterns for text and input fields (e.g., monospaced fonts, specific colors).
2. **Define Utilities**: Create `@utility tactical-input` and `@utility tactical-text` (or equivalent variations) in `src/index.css`.
3. **Verify Compliance**: Ensure custom utilities correctly use `@apply` or raw CSS to define the desired baseline "tactical hardware" aesthetic as dictated by ADR 024. Ensure hover and focus states can be correctly inherited natively through v4's directive structure.

## Acceptance Criteria
- [ ] Appropriate `@utility tactical-input` and `@utility tactical-text` primitives are defined in `src/index.css`.
- [ ] Tailwind v4 formatting and structure is respected.
