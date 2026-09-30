---
id: research-519-601-investigate-tracker-refactoring-failure
type: RESEARCH
title: Investigate Tracker and Radar Component Refactoring Failures
status: COMPLETED
owner_persona: researcher
created_at: '2026-09-20T16:54:27.803Z'
updated_at: '2026-09-30'
depends_on: []
jules_session_id: null
parent: story-125-519-refactor-complex-dashboard
rejection_count: 2
rejection_reason: ''
locks: []
---

# Research: Investigate Tracker and Radar Component Refactoring Failures

## Context
Task `task-519-547-trackers-radars-coder` repeatedly failed and reached its maximum rejection count. The objective of the task was to refactor specialized tracker components (e.g., `PokerusBadge.tsx`, `Gen3MirageIslandTracker.tsx`, `ShoalItemTracker.tsx`) by replacing inline tactical styling classes with Tailwind v4 `@utility` classes like `tactical-panel`, `tactical-badge`, and `tactical-text`.

## Objectives
- Identify the root cause of the task failures.
- Provide a viable approach for applying `@utility` classes correctly.

## Findings
Investigation reveals that while the underlying base primitives (`TacticalPanel`, `TacticalBadge`, `TacticalStatusPanelItem`) were successfully refactored to use the new `@utility` classes natively, the *specialized tracker components themselves* were never fully updated. Components like `ShoalItemTracker.tsx` and `Gen3TrickHouseDashboard.tsx` still rely on inline styling rules (e.g., `font-mono uppercase tracking-widest`) for specific text and structural elements instead of using the required `tactical-text` utility class. This incomplete implementation of the acceptance criteria led to the persistent QA rejections.

## Viable Approach
The correct approach is to actively update the specialized tracker components (`Gen3MirageIslandTracker.tsx`, `ShoalItemTracker.tsx`, `Gen3TrickHouseDashboard.tsx`, `Gen3SecretBaseDashboard.tsx`, etc.) to replace all raw inline text styling rules (`font-mono text-xs text-zinc-400 uppercase tracking-widest`) with the `tactical-text` utility class. The base layout utilities (like `tactical-panel`) are already naturally inherited from the underlying `TacticalPanel` primitive and do not require further modification in these specific files.

## Acceptance Criteria
- [x]  Root cause of the refactoring failure is identified and documented.
- [x]  A viable approach for applying @utility classes to the tracker/radar components is provided.
