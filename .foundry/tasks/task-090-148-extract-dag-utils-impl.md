---
id: task-090-148-extract-dag-utils-impl
type: TASK
title: Implement DAG Utilities Extraction
status: READY
owner_persona: coder
created_at: '2026-06-04'
updated_at: '2026-06-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-053-090-extract-dag-utilities
tags:
  - refactor
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from story-053-090-extract-dag-utilities
---

# Implement DAG Utilities Extraction

## 1. Introduction
This task requires extracting shared DAG utility functions from existing orchestrator scripts (`foundry-orchestrator.ts` and `foundry-heartbeat.ts`) into a new shared module `dag-utils.ts` in `.github/scripts/`.

## 2. Technical Specs
- Create `.github/scripts/dag-utils.ts`.
- Extract basic utility functions (`todayISO`, `logToJournal`).
- Extract pure DAG traversal functions (`buildReverseDependencyGraph`, `getOrphanedNodes`).
- Create `.github/scripts/dag-utils.test.ts` with unit tests for the extracted logic.
- Update `foundry-orchestrator.ts`, `foundry-heartbeat.ts` and their respective tests to import and use the new module.

## Acceptance Criteria
- [x] `dag-utils.ts` is created and contains the extracted functions.
- [x] Appropriate unit tests are added in `dag-utils.test.ts`.
- [x] Existing functionality works seamlessly utilizing the new utility file.

**Important Instructions:**
- If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
