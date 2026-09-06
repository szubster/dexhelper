---
id: adr-145-031-component-variant-theming
type: ADR
title: 'ADR: Unified Component Variants and Theming'
status: ACTIVE
owner_persona: architect
created_at: '2026-08-11'
updated_at: '2026-09-04'
depends_on:
  - research-145-001-component-variant-libraries
  - research-145-002-component-theming-mechanisms
jules_session_id: '1269760152544835588'
pr_number: null
parent: idea-145-component-variants-theming-consolidation
tags:
  - refactor
  - styling
  - frontend
  - theming
  - design-system
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# ADR 031: Unified Component Variants and Theming

## Status
Proposed (Pending Selection)

---

## Context
DexHelper relies heavily on customized UI components adhering to the tactical hardware aesthetic (ADR 008). These components must support different theme color palettes mapped to various retro Pokémon game versions.
The current implementation suffers from inline class verbosity and inconsistent style mapping across files (such as `TacticalPanel`, `TacticalCard`, and others).

To consolidate, dry out, and unify our styling architecture, we conducted extensive research across component variant libraries (`research-145-001-component-variant-libraries`) and theme delivery mechanisms (`research-145-002-component-theming-mechanisms`). This ADR lays out the resulting options to allow stakeholders to select the final implementation path.

---

## Proposed Options

### Path A: Class Variance Authority (CVA) + CSS Custom Variables (Recommended)
This path pairs **Class Variance Authority (CVA)** for local React component variants (e.g., `size`, `intent`, `disabled`) with **CSS custom variables** swapped at the document root for multi-theming.

* **How it works:**
  - Component-specific configuration is declared in TypeScript using CVA's pure string mapper.
  - Multi-theme colors are stored as semantic tokens inside `src/index.css` (using Tailwind CSS v4's `@theme` directive mapped to standard CSS variables).
  - Swapping active themes updates a single CSS class name on the root HTML element.
* **Pros:**
  - Perfect TypeScript type safety and auto-complete for variant props (e.g., `<TacticalCard variant="emerald" size="lg">`).
  - Zero JS runtime overhead on theme swap, keeping dense layouts (e.g., grid lists of 400 items) highly responsive.
  - Keeps bundle size impact negligible (~1KB JS addition).
* **Cons:**
  - Requires adding the `class-variance-authority` package as a dependency.

---

### Path B: Native Tailwind CSS v4 `@utility` Directives
This path shifts all variant and theme declarations out of JS completely, writing custom tactical utility components directly inside the global CSS using Tailwind v4's native `@utility` rules.

* **How it works:**
  - Primitives like `.tactical-card` are declared using `@utility` inside `src/index.css`.
  - Component variants are toggled by appending supplementary modifier classes (e.g., `.tactical-card-emerald`).
* **Pros:**
  - Zero addition to package.json JavaScript dependencies.
  - Full offloading of layout and style transitions to the browser engine.
* **Cons:**
  - Sacrifices type safety inside JSX; props must be manually mapped to CSS class name strings.
  - Moves style declarations far from the React components, slightly reducing developer cohesion.

---

### Path C: Custom Lightweight TypeScript Variant Wrapper
This path builds a lightweight string builder utility directly in our utilities folder without adding any external packages, mirroring CVA's structure using pure TypeScript.

* **How it works:**
  - We write a custom generic type helper `createVariants` that utilizes standard object lookups.
* **Pros:**
  - Zero external package footprint in `package.json`.
  - High degree of control over the internal string assembly.
* **Cons:**
  - Adds custom boilerplate code to maintain inside our core repository.
  - Lacks community-vetted edge-case checking or compound variant resolutions.

---

## Consequences & Evaluation
Selecting a path will define the long-term design system structure for DexHelper.

- **Developer Experience (DX):** Path A provides the most robust type checking, ensuring developer-side changes do not silently break.
- **Performance:** Paths A, B, and C all offer exceptional performance because they avoid React Context or heavy runtime CSS generation, relying instead on native CSS rendering.
- **Maintenance:** Path A provides the best local file cohesion while keeping global overrides cleanly separated inside the global stylesheet.
