---
id: adr-071-024-tailwind-v4-utility-consolidation
type: ADR
title: Tailwind v4 Utility Consolidation Strategy
status: COMPLETED
owner_persona: architect
created_at: '2026-06-09'
updated_at: '2026-06-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-071-150-tailwind-v4-adr
tags:
  - architecture
  - tailwind
  - styling
research_references:
  - .foundry/research/research-071-137-tailwind-v4-utilities.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR 024: Tailwind v4 Utility Consolidation Strategy

## Context
With the migration to Tailwind v4, we need to replace the deprecated `@layer components` syntax for creating custom utilities. Our application enforces a strict "tactical hardware" aesthetic. This requires sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts. Currently, these styles are achieved by repeating long strings of inline classes (e.g., `border border-dashed rounded-none border-zinc-800 bg-zinc-950 font-mono text-zinc-400`). This leads to code duplication and makes sweeping design changes difficult.

Research (Node ID: `research-071-137-tailwind-v4-utilities`) has confirmed that Tailwind v4's new native `@utility` directive allows for clean definition of custom primitives, replacing `@layer components`, and natively supports inheriting variants.

## Decision
We will consolidate repetitive tactical utility combinations into custom primitives using Tailwind v4's `@utility` directive in `src/index.css`.

### Implementation Details
1.  **Directive Usage**: We will strictly use the `@utility` directive.
2.  **Naming Convention**: All custom utilities created for this purpose MUST be prefixed with `tactical-`.
    *   Example: A panel background utility will be named `tactical-panel`.
    *   Example: A focus state utility will be named `tactical-focus`.
3.  **File Location**: All `@utility` definitions will be placed in `src/index.css`.

### Migration Strategy
The migration from inline classes to the new `tactical-*` utilities will be performed incrementally to avoid regressions.

1.  **Definition Phase**: Define the core `tactical-*` utilities in `src/index.css` (e.g., `tactical-panel`, `tactical-border`, `tactical-text`).
2.  **Component-by-Component Adoption**: Update individual components in `src/components/` one at a time.
3.  **Verification**: After updating a component, manually or automatically (via testing) verify that the visual "tactical hardware" aesthetic remains unchanged.
4.  **Cleanup**: Once all components are migrated, audit for any remaining hardcoded tactical class combinations.

## Consequences
*   **Positive**: Reduced code duplication, easier global styling updates, and a cleaner component codebase.
*   **Positive**: Adherence to Tailwind v4 standards.
*   **Negative**: Initial effort required to define the utilities and migrate existing components.
