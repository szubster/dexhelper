---
id: research-527-734-investigate-pathfinder-chain-viz-ui-failure
type: RESEARCH
title: Investigate Pathfinder Chain Visualization UI Failure
status: READY
owner_persona: researcher
created_at: '2026-10-30'
updated_at: '2026-10-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-115-527-pathfinder-chain-visualization
tags:
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Pathfinder Chain Visualization UI Failure

## Overview
Investigate the root cause of the permanent failure of `task-527-669-pathfinder-chain-viz-ui` which failed to adhere to the tactical hardware aesthetic guidelines (ADR 008, ADR 024). Provide concrete findings and recommendations for the retry task to successfully implement the required visual aesthetic.

## Acceptance Criteria
- [x] Read the failure logs/history for `task-527-669`.
- [x] Document the specific tactical aesthetic rules that were missed.
- [x] Provide clear recommendations for `task-527-735` to avoid these failures.

## Research Report

### Findings on task-527-669-pathfinder-chain-viz-ui Failure
The failure occurred due to repeated violations of the tactical hardware aesthetic guidelines (ADR 008 and ADR 024) in `src/features/pathfinder/components/PathfinderChainViz.tsx`.
According to the QA logs:
1. The component used raw inline Tailwind typography classes (e.g., `font-mono text-cyan-500/70 text-xs tracking-widest`, `font-mono text-xs text-zinc-400`) instead of using the designated `@utility tactical-text` class from `src/index.css` (`@apply font-mono uppercase tracking-widest`).
2. The `speciesName` div (`<div className="text-lg font-bold tracking-wider uppercase">{step.speciesName}</div>`) completely missed the `font-mono` class.

### Recommendations for task-527-735-pathfinder-chain-viz-ui-retry
To successfully implement the required visual aesthetic:
1. **Use `tactical-text` utility:** Replace repeated inline classes like `font-mono uppercase tracking-widest` with `tactical-text`. For example, use `tactical-text text-cyan-500/70 text-xs` instead of manually combining font, case, and tracking.
2. **Apply `font-mono` universally:** Ensure that all text elements, particularly prominent ones like `speciesName`, use `font-mono` or `tactical-text`. Do not omit `font-mono` on any text.
3. **Continue using Tactical Primitives:** The use of `TacticalPanel` was correct; continue to leverage primitives from `src/components/` and `src/index.css` rather than building them from scratch.
