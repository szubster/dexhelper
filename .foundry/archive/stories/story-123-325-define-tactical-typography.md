---
id: story-123-325-define-tactical-typography
type: STORY
title: Define Tactical Typography Utilities
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-17'
updated_at: '2026-08-15'
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
# Story: Define Tactical Typography Utilities

## Objective
Define any remaining typography-related `@utility` primitives in `src/index.css` as outlined in the Epic scope, specifically to ensure that the "tactical hardware" typography styling is fully supported.

## Scope
1. Review the existing `tactical-text` utility and any other typography-related classes required by ADR 024 constraints (e.g. monospaced fonts, uppercase styles).
2. If any further specific variations of `tactical-text` are required by the scope (or if `tactical-text` was only partially implemented), define them. Since `tactical-text` is already present in `src/index.css`, this story acts as a final audit and closure for the typography portion of the epic.

## Acceptance Criteria
- [x] Typography utilities are fully verified to match the scope of epic-071-123.
- [x] task-325-331-implement-tactical-typography
