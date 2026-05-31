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

## 2026-05-28: Enforce Hierarchical Verification Timing for Macro Nodes

I noticed that macroscopic Foundry nodes like `EPIC` and `STORY` nodes were prematurely transitioning to `VERIFYING` and `COMPLETED` states before their underlying child tasks were actually finished. This created a false sense of progress and unblocked downstream nodes too early.

To resolve this, I updated the orchestrator (`foundry-orchestrator.ts`) to enforce strict implicit hierarchical dependency. Now, any `ACTIVE` or `VERIFYING` parent node that has incomplete descendants will be automatically suspended to `PENDING`. It will remain in a Late-Binding wait state until the entire spawned sub-tree is completely verified and in the `COMPLETED` state.
## 2026-05-28: Identified DAG Orchestrator Cancellation Bug

While reviewing rejected nodes, I discovered that `task-072-128-implement-dag-cancellation.md` was repeatedly rejected. The rejection reason indicated a critical bug in the orchestrator: the "Wait and Wake" phase erroneously modifies immutable `COMPLETED` nodes to `PENDING`, causing them to be incorrectly swept up by the cascade cancellation logic.

Autonomously generated `idea-066-fix-wait-and-wake-cancellation-bug.md` to propose a fix for this bug and prevent the orchestrator from mutating immutable `COMPLETED` nodes.
## 2026-05-25: Refactoring DAG operations to shared utility module

While analyzing the codebase for systemic improvements, I noticed significant duplication of core DAG operations (such as traversing reverse dependencies and updating node statuses via gray-matter) between `foundry-orchestrator.ts` and `foundry-heartbeat.ts`. This duplication creates a surface area for bugs where one script might diverge from the other (e.g. failing to properly append `rejection_reason` or mutating YAML fields via regex).

To proactively mitigate this technical debt and improve the maintainability of the Foundry engine, I autonomously generated `idea-067-extract-dag-utils.md` to propose extracting these common functions into a shared `dag-utils.ts` module. I also generated `idea-066-enforce-gray-matter-linter.md` to codify the ADR 006 requirements into a CI-enforced linter rule.
