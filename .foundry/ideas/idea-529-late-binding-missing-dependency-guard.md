---
id: idea-529-late-binding-missing-dependency-guard
type: IDEA
title: Late Binding Missing Dependency Guard
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-09-23'
updated_at: '2026-09-23'
depends_on: []
tags:
  - workflow
  - late-binding
  - process
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
critical_weight: 0
jules_session_id: null
pr_number: null
---

# Late Binding Missing Dependency Guard

## Context & Problem Statement
Analysis of Coder persona journals (e.g., `2026-09-20-12-00-00.md` / `task-564-578-e2e-navigation-and-selection`) revealed recurring friction where Coder tasks were abruptly cancelled or aborted because required UI components or state scaffolds did not exist when execution began.

Instead of aborting or cancelling tasks when prerequisite scaffolding or UI components are absent, agents should leverage Late Binding to spawn missing dependency nodes (such as `TASK` or `STORY` nodes assigned to `tech_lead` or `coder`) and transition the parent task into a `PENDING` state waiting for those dependencies to complete.

## Proposed Solution
1. **Persona Prompt Enforcement & Reminders**: Update `coder.md` and `core_policies.md` to explicitly forbid cancelling or aborting implementation/E2E tasks solely due to missing prerequisite UI or state dependencies.
2. **Automated Late Binding Guidance**: Instruct agents encountered with missing prerequisite files/components to dynamically generate the missing `TASK` node(s), link them as unchecked checkboxes in their own `## Acceptance Criteria` section, and submit an empty PR to trigger the Late-Binding Orchestrator Demotion.
3. **Orchestrator Validation**: Ensure the orchestrator detects when a task creates child dependencies via late binding and cleanly demotes the task to `PENDING` rather than registering an execution failure or task cancellation.

## Acceptance Criteria
- [ ] Draft PRD / Epic to update persona prompts and core policy directives regarding late-binding missing dependencies.
- [ ] Add explicit instructions prohibiting abrupt task cancellation when prerequisite UI/state components are missing.
- [ ] Integrate late-binding dependency creation test coverage into the orchestrator test suite.
