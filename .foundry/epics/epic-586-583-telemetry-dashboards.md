---
id: epic-586-583-telemetry-dashboards
type: EPIC
title: Update Telemetry Scripts and Dashboards
status: PENDING
owner_persona: story_owner
created_at: '2026-10-08'
updated_at: '2026-10-09'
depends_on:
  - epic-586-581-orchestrator-rejection-processing
  - epic-586-582-yaml-schema-counters
jules_session_id: null
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
confidence_score: null
---

# Update Telemetry Scripts and Dashboards

## Context
With the introduction of new rejection processing logic and YAML counters, the telemetry tools and metrics dashboards must be updated to explicitly provide visibility into distinct rejection reasons and statuses in the Foundry DAG.

## Objectives
- Update Telemetry tools to parse and export the new `system_failure_count` and distinct rejection reasons.
- Update metrics dashboards to display and distinguish system failures vs. domain failures.

## Acceptance Criteria
- [ ] Generate an exclusive STORY dedicated to Integration and E2E Verification.
