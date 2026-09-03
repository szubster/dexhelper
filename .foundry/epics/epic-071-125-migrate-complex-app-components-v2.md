---
id: epic-071-125-migrate-complex-app-components-v2
type: EPIC
title: Migrate Complex App Components V2
status: READY
owner_persona: story_owner
created_at: '2026-07-03'
updated_at: '2026-09-02'
depends_on:
  - epic-071-124-migrate-core-tactical-components-v2
jules_session_id: null
pr_number: null
parent: prd-071-040-tailwind-v4-utilities-migration
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Epic: Migrate Complex App Components V2

## Objective
Refactor higher-level, complex application components and views to leverage the new `@utility` classes, extending the cleanup effort beyond the foundational core components.

## Scope
1. **Target Areas**: Focus on complex composites and full page layouts, such as:
   - Dashboard layouts (`src/components/dashboard/`)
   - Data visualization containers (e.g., Radar displays, heatmaps)
   - Specialized trackers (e.g., Berry tracker UI, Pokérus tracker UI)
2. **Refactoring Process**:
   - Replace redundant inline tactical classes with their corresponding semantic `@utility` class (e.g., `tactical-panel`, `tactical-text`).
   - Where a specific combination of utilities is used *only* once for a highly specialized layout, it may remain as inline classes.
3. **No Visual Regressions**: Ensure the application maintains its precise tactical hardware aesthetic. Pay special attention to z-indexing, layout stacking, and responsive behaviours.

## Acceptance Criteria
- [ ] High-level components and views are updated to use semantic `@utility` classes where appropriate.
- [ ] The tactical hardware aesthetic is maintained without visual regressions.
- [ ] story-125-519-refactor-complex-dashboard
- [ ] story-125-520-refactor-complex-dashboard-e2e
