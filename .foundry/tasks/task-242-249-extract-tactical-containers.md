---
id: task-242-249-extract-tactical-containers
type: TASK
title: Extract Tactical Container Utilities
status: PENDING
owner_persona: coder
created_at: '2026-06-29'
updated_at: '2026-06-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-097-242-tailwind-v4-tactical-containers
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: Extract Tactical Container Utilities

## Objective
Define the `tactical-panel` and `tactical-card` custom utilities in `src/index.css` using Tailwind v4's native `@utility` directive.

## Context & Rules (ADR 024)
Per ADR 024, we are migrating to Tailwind v4 and consolidating our tactical aesthetic classes into custom utilities.
- All new custom utilities for this purpose must use the `@utility` directive.
- All `@utility` definitions must reside in `src/index.css`.

**CRITICAL INSTRUCTIONS FOR IMPLEMENTER:**
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers. (Included for compliance).

## Acceptance Criteria
- [ ] `@utility tactical-panel` is properly defined in `src/index.css` using standard Tailwind styling for tactical UI.
- [ ] `@utility tactical-card` is properly defined in `src/index.css` using standard Tailwind styling for tactical UI.
- [ ] The definitions follow the guidelines in ADR 024.
