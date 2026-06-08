---
id: task-090-149-extract-dag-utils-qa
type: TASK
title: QA DAG Utilities Extraction
status: READY
owner_persona: qa
created_at: '2026-06-04'
updated_at: '2026-06-08'
depends_on:
  - .foundry/tasks/task-090-148-extract-dag-utils-impl.md
jules_session_id: null
pr_number: null
parent: story-053-090-extract-dag-utilities
tags:
  - qa
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from story-053-090-extract-dag-utilities
---

# QA DAG Utilities Extraction

## 1. Introduction
This task requires verifying the DAG utility extraction implemented in `.foundry/tasks/task-090-148-extract-dag-utils-impl.md`.

## 2. Verification Steps
- Verify that `.github/scripts/dag-utils.ts` has been created and exports the necessary utility functions.
- Verify that unit tests were created in `.github/scripts/dag-utils.test.ts`.
- Run tests (`cd .github/scripts && pnpm install && npx vitest`) and ensure everything passes.
- Verify that `.github/scripts/foundry-orchestrator.ts` and `.github/scripts/foundry-heartbeat.ts` successfully import and use these utilities.

## Acceptance Criteria
- [x] `dag-utils.ts` is verified to contain extracted functions.
- [x] `dag-utils.test.ts` is verified to test the logic correctly.
- [x] All orchestrator script tests pass without issue.
- [x] Old implementations of the utility functions are removed from their original files.

**Important Instructions:**
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you reject the implementation, update the target task's YAML frontmatter to `status: FAILED`, provide a `rejection_reason`, and log the rejection in the QA journal.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
