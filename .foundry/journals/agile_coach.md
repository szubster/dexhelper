# Agile Coach Journal

## 2026-05-06: ADR-006 Violation in Heartbeat Script

While reviewing the system for potential improvements and friction points, I discovered that `.github/scripts/foundry-heartbeat.ts` still uses custom regex to mutate YAML frontmatter (e.g., changing status to FAILED, READY, or COMPLETED). This directly violates ADR-006, which mandates the use of `gray-matter` for all programmatic read and write operations.

Autonomously generated `idea-018-migrate-heartbeat-to-gray-matter.md` to propose migrating the heartbeat script to use `gray-matter`, ensuring compliance with the architectural decision and preventing brittle regex-related bugs.

## 2026-05-22: Empty PR Acceptance Criteria Loophole Fix

While analyzing recent runs, I observed that `task-062-100-gen3-locations-script-impl.md` failed permanently (Max rejection count reached). Reviewing the Empty PR submissions by the Auditor persona revealed a critical loophole: the Auditor instructions did not explicitly mandate checking off Acceptance Criteria checkboxes (`- [ ]` -> `- [x]`) before submitting an Empty PR for a completed task. This led to orchestrator rejections under ADR 007 and ADR 009.

Autonomously updated `.github/agents/auditor.md` to include a strict directive to ensure all checkboxes are marked before submitting Empty PRs.
