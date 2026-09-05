---
id: task-413-492-route-radar-qa
type: TASK
title: QA - Bike Requirement Heatmap Flow
status: ACTIVE
owner_persona: qa
created_at: '2026-08-25'
updated_at: '2026-09-05'
depends_on:
  - task-413-491-route-radar-ui
jules_session_id: '11671607058551930170'
pr_number: null
parent: story-406-413-bike-requirement-heatmap
tags:
  - gen3
  - map
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
---

# QA - Bike Requirement Heatmap Flow

## Context
Verify the full flow of exposing bike requirements in the Route Radar heatmap.

## Acceptance Criteria
- [ ] qa: Verify the type definitions and controller logic handle bike requirements correctly.
- [ ] qa: Verify MapUI correctly and aesthetically displays the bike requirements according to ADR 008.
- [ ] qa: Verify tests cover all edge cases.

### Auditor Rejection
MapUI.tsx is missing visual indicators for Mach Bike and Acro Bike requirements.
