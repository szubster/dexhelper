---
id: task-278-305-extract-log-to-journal
type: TASK
title: Extract logToJournal Utility
status: PENDING
owner_persona: coder
created_at: '2026-07-13'
updated_at: '2026-07-13'
depends_on: []
jules_session_id: null
parent: story-053-278-extract-log-to-journal
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract logToJournal Utility

## Technical Specifications

1.  **Modify `.github/scripts/dag-utils.ts`**:
    *   Create and export a new function `logToJournal(logPath: string, logEntry: string)`.
    *   It should use `fs.appendFileSync` to safely append the `logEntry` to the file at `logPath`. Make sure it adds a newline `\n` to the entry if necessary.
2.  **Modify `.github/scripts/foundry-orchestrator.ts`**:
    *   Import `logToJournal` from `./dag-utils.ts`.
    *   Refactor the inline journal logging logic (where it currently uses `fs.appendFileSync` around line 958 for idempotent checks) to use the new `logToJournal` function.
3.  **Run Tests**:
    *   Execute `cd .github/scripts && pnpm install && npx vitest` to make sure orchestrator tests still pass.

## Failure Rules & Instructions
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] `logToJournal` is exported from `dag-utils.ts`.
- [ ] `foundry-orchestrator.ts` uses `logToJournal` instead of inline `fs.appendFileSync`.
