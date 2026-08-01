---
id: story-128-349-epic-planner-process-impl
type: STORY
title: Epic Planner Process Update Implementation
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-01'
updated_at: '2026-08-01'
depends_on: []
jules_session_id: '18237452878861157540'
pr_number: null
parent: epic-057-128-epic-planner-process-update
tags:
  - process
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Epic Planner Process Update Implementation

## Context
As part of enforcing macro node functional boundaries, we need to enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification.

## Goal
Update the instructions for the Epic Planner persona to enforce the creation of an Integration/Verification story for every EPIC.

## Acceptance Criteria
- [ ] Draft a `TASK` to update the Epic Planner prompt instructions (`.github/agents/epic_planner.md`) to explicitly require a final E2E Integration STORY when breaking down a PRD.
- [ ] Draft a QA `TASK` to verify that the Epic Planner process changes have been correctly documented.
