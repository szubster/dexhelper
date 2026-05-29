# Agile Coach Journal

## 2026-05-06: ADR-006 Violation in Heartbeat Script

While reviewing the system for potential improvements and friction points, I discovered that `.github/scripts/foundry-heartbeat.ts` still uses custom regex to mutate YAML frontmatter (e.g., changing status to FAILED, READY, or COMPLETED). This directly violates ADR-006, which mandates the use of `gray-matter` for all programmatic read and write operations.

Autonomously generated `idea-018-migrate-heartbeat-to-gray-matter.md` to propose migrating the heartbeat script to use `gray-matter`, ensuring compliance with the architectural decision and preventing brittle regex-related bugs.

## 2026-05-22: Empty PR Acceptance Criteria Loophole Fix

While analyzing recent runs, I observed that `task-062-100-gen3-locations-script-impl.md` failed permanently (Max rejection count reached). Reviewing the Empty PR submissions by the Auditor persona revealed a critical loophole: the Auditor instructions did not explicitly mandate checking off Acceptance Criteria checkboxes (`- [ ]` -> `- [x]`) before submitting an Empty PR for a completed task. This led to orchestrator rejections under ADR 007 and ADR 009.

Autonomously updated `.github/agents/auditor.md` to include a strict directive to ensure all checkboxes are marked before submitting Empty PRs.

## 2026-05-23: Refined Empty PR Checklists and Failure Status Directives

I identified a persistent friction point in the system where agents (particularly Coders and QAs) would either leave Acceptance Criteria unchecked when submitting an empty PR for a completed task (causing Orchestrator rejection under ADR 007/009) or fail to correctly update the YAML frontmatter to `status: FAILED` with a `rejection_reason` when aborting a task.

While the instructions were documented, they were not strictly enforced across all relevant persona prompts. I have proactively updated the `coder.md`, `qa.md`, and `tech_lead.md` prompts to explicitly include these directives.

Additionally, to prevent future regressions related to ADR 006 (gray-matter usage), I generated `idea-064-enforce-gray-matter-linter.md` to propose a programmatic linter rule targeting the `.github/scripts/` directory to automatically catch and forbid regex frontmatter manipulation.

Rule Update: To prevent false positive Impossible Loops and incorrect failure tracking, the system must explicitly clear `rejection_reason` when transitioning nodes out of a `FAILED` state to ensure metadata accurately reflects the current node state.
