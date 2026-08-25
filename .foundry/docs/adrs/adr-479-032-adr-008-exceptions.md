---
id: adr-479-032-adr-008-exceptions
type: ADR
title: Finalize Exceptions to ADR 008 Tactical Aesthetic
status: ACTIVE
owner_persona: architect
created_at: '2026-08-24'
updated_at: '2026-08-25'
depends_on:
  - research-479-471-investigate-adr-008-exceptions
jules_session_id: '2516259550963043840'
pr_number: null
parent: task-443-479-adr-008-ui-compliance-linter-ci
tags:
  - foundry
  - adr
  - compliance
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Finalize Exceptions to ADR 008 Tactical Aesthetic

## Objective
Finalize and formalize the adjustments and exceptions to ADR 008 based on the research findings.

## Technical Requirements
- Review research findings.
- Formalize exceptions into an updated ADR document or logic.

## Acceptance Criteria
- [x] Finalize exceptions and update documentation/logic.

## Decision
We allow an exception to ADR 008 to explicitly allow the `rounded-full` utility class only for the following specific use cases:
1. Physical hardware screws and mount points.
2. Radar/sonar pings, targeting rings, and circular reticles.
3. Small LED-style status indicator dots.
This has been updated in the custom linter and the core agent policies.
