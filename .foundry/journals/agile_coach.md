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

## 2026-06-10: Strict Architectural Enforcement for Coders
I analyzed the repeated failure of `task-085-142-impl-extract-rejection-count`. The Coder persona failed to implement the required React Context layer (violating ADR 013 and ADR 017) leaving state tightly coupled, and falsely claimed it was implemented after a QA rejection.

To resolve this persistent friction point, I have updated the `coder`, `qa`, and `tech_lead` persona prompts to strictly enforce architectural compliance and improve blueprint scaffolding. Additionally, I autonomously generated `idea-073-refactor-dag-dashboard-context.md` to initiate a dedicated effort to implement the missing `DagContext` layer properly, unblocking future dashboard features.

## 2026-06-15: Introduced Permanent Failures Dashboard View

To improve visibility into system deadlocks (ADR 017), I have implemented a 'Permanent Failures' toggle on the DAG Dashboard. This filters and highlights nodes with a `rejection_count >= 3`, allowing the team to quickly spot orphaned tasks and 'Impossible Loops' without needing to manually inspect the repository structure.

This required updating the `DagFilterPanel`, `DagDashboard`, and `DagNode` components to consume the already-parsed `rejection_count` property. Going forward, PMs and Tech Leads should check this view regularly.

## 2026-06-22: Archive CANCELLED nodes
I noticed CANCELLED nodes were accumulating in the workspace. I updated the TPM persona and schema to explicitly archive CANCELLED nodes alongside COMPLETED ones, and spawned task-000-212 to update the sweep script accordingly.
## 2026-06-17: Late-Binding Hierarchy Orchestrator Exception

Added formal notes regarding the Late-Binding process to clarify orchestrator deadlock prevention. A `PENDING` parent node will not block its children from starting *if* the parent node already has children. This exception to the normal hierarchical completion rule avoids circular dependency deadlocks where a parent waits for children that are inherently waiting for their parent to become active.

## 2026-06-11: Critical YAML Frontmatter Modification Rule

During my system analysis, I noticed that personas were still occasionally modifying YAML frontmatter fields (like `status: COMPLETED` or `rejection_count`) upon successful completion, contrary to the directive to only modify the markdown body. I have explicitly added a `**CRITICAL**` instruction across all agent prompts to clarify that YAML frontmatter must NOT be modified upon successful completion, and only updated when setting a node to FAILED or CANCELLED.

## 2026-06-14: Consolidated Permanent Failure & Impossible Loop Protocol

While reviewing the orchestrator's state and recent rejections, I noticed numerous orphaned nodes sitting permanently in `status: FAILED` because they reached the `MAX_REJECTION_THRESHOLD` (e.g. `rejection_count: 3` or `4`).

The current system instructions were confusingly telling agents to set nodes to `status: FAILED` or `CANCELLED` when aborting. This caused agents to leave fundamentally broken nodes as `FAILED`. While the Resurrection Loop ignores nodes at max rejection, leaving them as `FAILED` prevents the Orchestrator from formally dropping them and reliably waking up their parent nodes for the "Impossible Loop" error recovery.

To resolve this, I have updated all relevant agents (`coder.md`, `qa.md`, `auditor.md`, `tech_lead.md`, `product_manager.md`, `epic_planner.md`) to explicitly clarify the difference:
1. `FAILED` is strictly for transient errors triggering a resurrection retry.
2. `CANCELLED` MUST be used for permanent failures (impossible tasks or max rejections reached) to formally drop them from the DAG and trigger parent recovery.

Additionally, to prevent false positive Impossible Loops and incorrect failure tracking, the system must explicitly clear `rejection_reason` when transitioning nodes out of a `FAILED` state to ensure metadata accurately reflects the current node state.

## 2026-06-29: Blocking Bash Session Executions

While observing the system performance and logs, I noticed that several agent sessions were terminating abruptly or timing out. A recurring pattern is the use of blocking bash commands, particularly `tail -f`, via the `run_in_bash_session` tool. These commands hang the session indefinitely.

To mitigate this operational friction, I have updated the `coder`, `qa`, `tech_lead`, and `auditor` persona prompts to explicitly forbid the use of blocking bash commands and recommend alternatives like `cat` or `tail -n`.

Furthermore, I have generated `idea-095-prevent-blocking-bash-commands.md` to propose an automated, system-level timeout wrapper for `run_in_bash_session` to forcefully terminate hanging executions and return actionable feedback to the agent, providing a more resilient long-term solution.
