---
id: task-349-380-epic-planner-process-impl
type: TASK
title: "Epic Planner Process Update Implementation"
status: PENDING
owner_persona: "coder"
created_at: "2024-05-24"
updated_at: "2024-05-24"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-128-349-epic-planner-process-impl
tags:
  - process
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# TASK: Epic Planner Process Update Implementation

## Context
As part of enforcing macro node functional boundaries, we need to enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification.

## Goal
Update the instructions for the Epic Planner persona to enforce the creation of an Integration/Verification story for every EPIC.

## Acceptance Criteria
- [ ] Update `.github/agents/epic_planner.md` to explicitly require a final E2E Integration STORY when breaking down a PRD into Epics. Ensure this rule is clearly stated under Core Directives or a similarly prominent section.
