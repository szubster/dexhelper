---
id: task-349-381-epic-planner-process-qa
type: TASK
title: "Epic Planner Process Update Implementation QA"
status: PENDING
owner_persona: "qa"
created_at: "2024-05-24"
updated_at: "2024-05-24"
depends_on:
  - task-349-380-epic-planner-process-impl
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

# TASK: Epic Planner Process Update Implementation QA

## Context
As part of enforcing macro node functional boundaries, we need to enforce a process where every EPIC MUST generate a final STORY dedicated to Integration and E2E Verification.

## Goal
Verify that the updates to the Epic Planner persona instructions were implemented correctly.

## Acceptance Criteria
- [ ] Verify that `.github/agents/epic_planner.md` has been updated to explicitly require a final E2E Integration STORY for every EPIC.
- [ ] Ensure the new requirement is clearly stated under the Core Directives section or similar prominent location.
