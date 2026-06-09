---
id: story-053-090-health-scanner-diagnostic-models
type: STORY
title: Define Health Scanner Diagnostic Models
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-02'
updated_at: '2026-06-08'
depends_on: []
jules_session_id: '6641739856267262317'
pr_number: null
parent: epic-036-053-health-scanner-core-engine
tags:
  - architecture
  - types
  - save-file
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Define Health Scanner Diagnostic Models

## Context
Before implementing the actual validation logic for the Health Scanner Core Engine, we need to define the foundational data structures and types that will be returned by the scanner. This diagnostic output must precisely identify anomalies so they can be rendered properly in the UI.

## Scope
* Define `HealthScanResult`, `Anomaly`, and `Severity` (e.g., Warning, Critical) interfaces/types.
* Specify structure for locating anomalies (e.g., `Location: { type: 'pc_box', boxNumber: 8, slot: 3 }` or `{ type: 'inventory', index: 12 }`).
* Establish error codes or categories for specific corruption types (Checksum Error, Out of Bounds ID, Impossible Moveset, etc.).

## Acceptance Criteria
- [x] Tech Lead: Break this Story down into actionable Tasks for the coder.
- [x] All child tasks are COMPLETED.

## Child Tasks
* [.foundry/tasks/task-090-148-health-scanner-models-impl.md](.foundry/tasks/task-090-148-health-scanner-models-impl.md)
