---
id: research-089-167-investigate-heatmap-failure
type: RESEARCH
title: Investigate Route Radar Heatmap Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '6983425208422488672'
pr_number: null
parent: story-048-089-route-radar-density-aggregation
tags:
  - research
  - root-cause
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Route Radar Heatmap Failure

## Objective
Investigate the root cause of the previous implementation failure related to the `RouteRadarController` heatmap density logic.

## Scope
The previous attempt at implementing the heatmap logic in `story-048-089-route-radar-density-aggregation` failed permanently (triggering the Impossible Loop). Investigate the `auditor` and `qa` journals, review the rejected task implementations if available, and identify what structural or architectural requirement was missed (such as a missing UI integration or architectural invariant).

## Findings Summary
The root cause of the failure for `story-048-089-route-radar-density-aggregation` stems from missing architectural integrations and data schema violations:

1.  **Missing Architectural Integration (ADR 018):** `RouteRadarController` was created as an isolated class but was never integrated into the application's data flow (`Save State -> suggestionEngine -> RouteRadarController -> Heatmap State`), nor was it passed as props to the Map UI component.
2.  **Data Schema Violation (ADR 015):** The implementation continued to use the shortened data property `aid` (as seen in `encounter.aid`) instead of the fully expanded `areaId` mandated by ADR 015 ("Revert Data Format Optimizations").

These findings have been logged in the researcher journal to ensure future agents enforce structural integration and strict adherence to data schema ADRs.

## Acceptance Criteria
- [x] Investigate the root cause of the failure.
- [x] Document findings in `.foundry/docs/` or persona journals as appropriate.
- [x] Provide a summary here in this markdown body.
