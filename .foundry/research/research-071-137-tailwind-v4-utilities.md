---
id: research-071-137-tailwind-v4-utilities
type: RESEARCH
title: Explore Tailwind v4 APIs and Primitives
status: READY
owner_persona: researcher
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-071-tailwind-v4-utilities-migration
tags:
  - tech-debt
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Tailwind v4 @utility Consolidation

## Objective
Deeply explore Tailwind v4 APIs and primitives to determine the optimal strategy for consolidating repetitive UI classes into native `@utility` definitions. Specifically, research how to cleanly replace the deprecated `@layer components` syntax.

## Focus Areas
1. **The `@utility` API:** Investigate the exact syntax and capabilities of the `@utility` directive in Tailwind v4 for creating custom utilities.
2. **Nesting and `@apply`:** Determine if and how `@apply` can be safely used inside `@utility` blocks to inherit variants (like `hover:`, `md:`) natively without complex configuration.
3. **Migration Edge Cases:** Identify potential pitfalls when migrating from inline classes (like `border border-dashed rounded-none border-zinc-800`) to custom utilities (like `tactical-panel`).

## Deliverables
- A comprehensive summary of Tailwind v4 utility configuration.
- A proposed structure for `src/index.css` to house these new tactical primitives.

## Tasks
- [x] Research the `@utility` directive documentation for Tailwind v4.
- [x] Document findings and formulate a concrete strategy for `src/index.css`.
