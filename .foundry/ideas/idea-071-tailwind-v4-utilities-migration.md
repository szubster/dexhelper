---
id: idea-071-tailwind-v4-utilities-migration
type: IDEA
title: Tailwind v4 @utility Consolidation
status: PENDING
owner_persona: product_manager
created_at: '2025-02-13'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - tech-debt
  - styling
  - refactor
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Idea: Tailwind v4 @utility Consolidation

## Context
DexHelper currently heavily relies on Tailwind CSS for styling. Following the "tactical hardware/snooping" aesthetic (ADR 008), there is a significant duplication of class structures across the codebase, particularly combinations like `border-dashed`, `rounded-none`, and `focus-visible:ring-[var(--theme-primary)]` to maintain the sharp, terminal-like appearance.
Currently, `border-dashed` appears 107 times and `rounded-none` 77 times inside the `src/components/` directory, leading to overly verbose and repetitive JSX markup.

Since the project is using **Tailwind v4** (which replaces the old `@layer components` functionality with a native `@utility` API), we have a modern pathway to DRY out these styles.

## Proposal
Leverage Tailwind v4's new `@utility` directive in `src/index.css` to group heavily repeated, thematic class combinations into reusable, semantic custom utilities.

- **Create Tactical Primitives:** Introduce utility classes such as `@utility tactical-panel` or `@utility tactical-border` to automatically apply `border border-dashed rounded-none border-zinc-800`.
- **Create Interactive Primitives:** Introduce utilities like `@utility tactical-focus` to abstract away the repetitive focus-visible styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`).
- **Use @apply internally:** Define these inside `src/index.css` using the `@apply` keyword inside `@utility` blocks, which allows inheriting variants (like `hover:` and `md:`) natively without complex configuration.

## Research Phase and Migration Strategy
Before implementation, extensive, deep, and multi-modal research must be conducted. This research should be recursive, exploring other APIs and primitives available in Tailwind v4. The research and ADR phases will work in a feedback loop to solidify the best approach.

The eventual implementation must be an incremental migration to avoid breaking changes and ensure smooth adoption across the extensive component library.

## Value Proposition
This significantly improves DX (Developer Experience) and readability. Components will have drastically shorter `className` attributes, reducing noise while making it much easier to universally adjust the "tactical" aesthetic constraints in a single source of truth (`src/index.css`).

## Next Steps
- [x] Product Manager: Create RESEARCH nodes to deeply explore Tailwind v4 APIs and primitives.
- [ ] Technical Lead: Based on research findings, draft an ADR outlining the chosen consolidation strategy.
- [ ] Technical Lead: Outline an incremental migration strategy to update components across `src/components/` without regressions.

- [ ] .foundry/research/research-071-137-tailwind-v4-utilities.md
- [ ] .foundry/tasks/task-071-150-tailwind-v4-adr.md
- [ ] .foundry/prds/prd-071-040-tailwind-v4-utilities-migration.md
