---
id: task-650-746-lazy-load-gen3-dashboard-components
type: TASK
title: Lazy Load Gen 3 Dashboard Components
status: READY
owner_persona: coder
created_at: '2026-10-12T17:00:00Z'
updated_at: '2026-11-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-402-650-update-generation-views
tags:
  - ui
  - gen-specific
  - lazy-loading
research_references: []
rejection_reason: ''
locks: []
---

# Task: Lazy Load Gen 3 Dashboard Components

## Description
In `src/routes/gen3-dashboard.tsx`, several generation-specific UI components are imported directly. Update these imports to use `React.lazy()` to defer loading these components until they are actually rendered, reducing the initial bundle size.

## Acceptance Criteria
- [ ] Update imports in `src/routes/gen3-dashboard.tsx` to use `React.lazy()` for components like `MissedMilestonesWidget`, `PokedexGapVisualizerWidget`, `TrainerCardStatusWidget`, `Gen3MissedItemsDashboard`, `WallpaperDashboard`, `Gen3PokeblocksDashboard`, `PokeblockOptimizerPanel`, and `Route119Map`.
- [ ] Ensure the components are wrapped in a `Suspense` boundary if they are not already, or leverage the route's default suspense handling if applicable.
