---
id: task-335-387-track-daily-rematch-status-qa
type: TASK
title: QA Gen 3 Secret Base Daily Rematch Status UI
status: READY
owner_persona: qa
created_at: '2026-08-02'
updated_at: '2026-08-02'
depends_on:
  - task-335-386-track-daily-rematch-status-impl
jules_session_id: null
pr_number: null
parent: story-324-335-track-daily-rematch-status
tags:
  - feature
  - gen3
  - secret-base
  - ui
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Secret Base Daily Rematch Status UI

## Context
Players can battle the NPC trainers in Secret Bases once per day. The `battledOwnerToday` flag has been integrated into the UI. This task verifies that the implementation correctly reflects this status and adheres to project standards.

## Objectives
- Verify that the UI correctly displays the daily rematch status for Gen 3 Secret Base trainers based on the `battledOwnerToday` flag.
- Verify adherence to UI guidelines (ADR 008).
- Verify adequate test coverage.

## Verification Steps
1.  **UI Testing:** Run the development server and verify that the Secret Base UI conditionally renders the correct status based on mock save file data (e.g., test cases where `battledOwnerToday` is true, false, or undefined).
2.  **ADR Compliance:** Review the implemented React components to ensure they strictly adhere to ADR 008 (tactical hardware/snooping aesthetic, `rounded-none`, `border-dashed`, `font-mono`).
3.  **Code Review & Test Coverage:** Run `pnpm test` and review the new/updated tests. Ensure that the conditional rendering logic for `battledOwnerToday` is properly covered by unit or component tests.

## Acceptance Criteria
- [ ] Verify UI functionality for displaying `battledOwnerToday` status.
- [ ] Verify UI components strictly adhere to ADR 008 styling guidelines.
- [ ] Verify comprehensive test coverage exists and passes.
