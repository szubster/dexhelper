---
id: task-090-148-health-scanner-models-impl
type: TASK
title: Health Scanner Models Implementation
status: PENDING
owner_persona: coder
created_at: '2026-06-04'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-053-090-health-scanner-diagnostic-models
tags:
  - architecture
  - types
  - save-file
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Health Scanner Models Implementation

## Context
Before implementing the actual validation logic for the Health Scanner Core Engine, we need to define the foundational data structures and types that will be returned by the scanner. This diagnostic output must precisely identify anomalies so they can be rendered properly in the UI.

## Requirements
Define the following TypeScript interfaces and types, placing them in an appropriate file for types in the engine:
* HealthScanResult
* Anomaly
* Severity (Warning, Critical)
* Location structure (e.g., { type: 'pc_box', boxNumber: 8, slot: 3 } or { type: 'inventory', index: 12 })
* Error codes or categories for specific corruption types (Checksum Error, Out of Bounds ID, Impossible Moveset, etc.)

## Acceptance Criteria
- [ ] Models are defined in the codebase.
- [ ] Models properly capture the required structure for Anomaly, Severity, and Location.

## Reminders
* If you permanently fail or abort this task, you MUST update the YAML frontmatter to status: FAILED or status: CANCELLED with a rejection_reason.
* If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.