---
id: epic-071-074-define-tailwind-v4-utilities
type: EPIC
title: Define Tailwind v4 Tactical Utilities
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-11'
updated_at: '2026-06-19'
depends_on:
  - task-071-150-tailwind-v4-adr
jules_session_id: '14764825156054760818'
pr_number: null
parent: prd-071-040-tailwind-v4-utilities-migration
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Define Tailwind v4 Tactical Utilities

## Objective
Extract and consolidate common, repetitive Tailwind class patterns used throughout `src/components/` into semantic custom utilities. Define these new primitives using Tailwind v4's native `@utility` directive in `src/index.css`.

## Scope
1. **Analyze existing codebase**: Identify repetitive tactical styling patterns such as panels with dashed borders, sharp corners (`rounded-none`), monospaced retro text, and specific focus states.
2. **Define Utilities**: Create corresponding `@utility` definitions in `src/index.css`. Expected primitives include:
    - `tactical-panel`
    - `tactical-button`
    - `tactical-focus`
    - `tactical-card`
    - `tactical-input`
    - `tactical-text` (or equivalent variations)
3. **Verify Compliance**: Ensure all custom utilities correctly use `@apply` or raw CSS to define the desired baseline "tactical hardware" aesthetic as dictated by ADR 024. Confirm that hover and focus states can be correctly inherited natively through v4's directive structure.

## Acceptance Criteria
- [x] Appropriate `@utility` primitives are defined in `src/index.css`.
- [x] Tailwind v4 formatting and structure is respected.

### Generated Stories
- [x] story-074-113-define-tactical-panel-and-card
- [x] story-074-114-define-tactical-button-and-focus
- [x] story-074-115-define-tactical-input-and-text
