---
id: prd-071-040-tailwind-v4-utilities-migration
type: PRD
title: Tailwind v4 @utility Consolidation
status: PENDING
owner_persona: epic_planner
created_at: '2026-06-09'
updated_at: '2026-06-18'
depends_on:
  - task-071-150-tailwind-v4-adr
jules_session_id: '18168795712351055980'
pr_number: null
parent: idea-071-tailwind-v4-utilities-migration
tags:
  - tech-debt
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Tailwind v4 @utility Consolidation

## Executive Summary
DexHelper is transitioning from repetitive inline Tailwind classes to semantic custom utilities defined in `src/index.css` via Tailwind v4's new `@utility` directive. This change will drastically improve the developer experience by DRYing out the codebase while maintaining our strict "tactical hardware/snooping" aesthetic.

## Functional Requirements
1. **Utility Consolidation**: The project must introduce centralized `@utility` classes in `src/index.css` to represent heavily used aesthetic combinations.
2. **Tactical Primitives**: At minimum, abstractions must be created for:
   - Panel borders (`border-dashed`, `rounded-none`, etc.)
   - Focus states (`focus-visible:ring-[var(--theme-primary)]`, etc.)
3. **Incremental Component Migration**: Existing components in `src/components/` must be updated to replace raw class combinations with the new semantic utility classes.
4. **No Visual Regressions**: The migration must perfectly preserve the existing user interface. The tactical, sharp terminal-like appearance must remain unaltered.

## Scope
- Updating `src/index.css` with the new Tailwind v4 syntax.
- Migrating components within the `src/components/` directory.

## Out of Scope
- Redesigning the current aesthetic.
- Migrating generic unrepeated utility classes.

## Acceptance Criteria
- [x] Epics are created to handle the migration in manageable chunks.


- [ ] epic-071-074-define-tailwind-v4-utilities
- [ ] epic-071-075-migrate-core-tactical-components
- [ ] epic-071-076-migrate-complex-app-components

- [ ] epic-071-077-tailwind-designer-persona
