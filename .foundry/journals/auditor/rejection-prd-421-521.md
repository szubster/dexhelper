# Auditor Rejection: prd-421-521-automated-schema-linting

Date: 2026-09-19

## Reason
The target PRD (`prd-421-521-automated-schema-linting`) was transitioned to `READY` and assigned to `auditor`, but its descendant epics are not all completed. Specifically:
- `epic-521-552-schema-linter-core-logic` is `PENDING`
- `epic-521-553-schema-linter-integration` is `FAILED`

## Learnings
Macro nodes (like IDEA, PRD, EPIC) must not be verified until all descendant nodes in the generated sub-tree have fully transitioned to the `COMPLETED` state. A macro node MUST NOT be verified until its functional requirements are actually implemented and merged by its child tasks.

Therefore, the verification of `prd-421-521-automated-schema-linting` was rejected. Its status was set back to `FAILED` with a `rejection_reason` to trigger the Resurrection Loop and allow proper resolution of its children.