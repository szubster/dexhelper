---
id: story-053-278-extract-log-to-journal
type: STORY
title: Extract logToJournal Utility
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-06'
updated_at: '2026-07-11'
depends_on: []
jules_session_id: '6421165205811992602'
parent: epic-036-053-shared-dag-utilities
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

## 1. Introduction
The `logToJournal` function was missed in the initial extraction of DAG utilities. We need to implement this utility in `.github/scripts/dag-utils.ts` and refactor `.github/scripts/foundry-orchestrator.ts` to use it instead of its inline journal logging logic.

## 2. Technical Details
- Create a `logToJournal(logPath: string, logEntry: string)` function in `dag-utils.ts` that safely appends the log entry using `fs.appendFileSync`.
- Refactor the idempotent check logging in `.github/scripts/foundry-orchestrator.ts` (around line 958) to use the new `logToJournal` function.

## Acceptance Criteria
- [ ] `logToJournal` is exported from `dag-utils.ts`.
- [ ] `foundry-orchestrator.ts` uses `logToJournal` instead of inline `fs.appendFileSync`.
