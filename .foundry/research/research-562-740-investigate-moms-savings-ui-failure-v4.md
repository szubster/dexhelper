---
id: research-562-740-investigate-moms-savings-ui-failure-v4
type: RESEARCH
title: Investigate Gen 2 Mom's Savings UI Failure (v4)
status: READY
owner_persona: researcher
created_at: '2026-11-05'
updated_at: '2026-11-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-312-562-gen2-mom-savings-tracker-ui-core
tags:
  - research
  - gen2
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Research: Investigate Gen 2 Mom's Savings UI Failure (v4)

## Objective
Investigate the root cause of the permanent failure in `task-562-717-gen2-moms-savings-ui-v3` / `research-562-716-investigate-moms-savings-ui-failure-v3`.

## Context
The previous investigation `research-562-716-investigate-moms-savings-ui-failure-v3` reached max rejection count without resolution and was cancelled. The Tech Lead has restarted the investigation via the Impossible Loop to unblock the Mom's Savings Tracker UI integration.

## Acceptance Criteria
- [x] Determine the exact root cause of the rejection by reviewing QA journals or git history.
- [x] Document findings and formulate a correct remediation strategy in the research report section of this document.

## Research Report
The root cause for the rejection is that the `Gen2SavingsDashboard` UI implementation still violates ADR 008 and ADR 024 by using raw inline Tailwind typography classes (`font-mono text-xs text-zinc-400`, `font-mono text-2xl text-emerald-400`, etc.) rather than the required `@utility tactical-text` primitive defined in `src/index.css`.

The remediation strategy for the subsequent task is to update `Gen2SavingsDashboard` to fully utilize `tactical-text` and remove unauthorized inline `font-mono` usages (with the exception of cases where sizes might be strictly overridden on top of `tactical-text` if required, but primarily relying on standard tactical primitives).
