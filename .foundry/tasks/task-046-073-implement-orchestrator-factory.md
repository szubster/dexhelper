---
id: task-046-073-implement-orchestrator-factory
type: TASK
title: "Implement Orchestrator Test Node Factory"
status: COMPLETED
owner_persona: coder
created_at: "2026-05-09"
updated_at: "2026-05-09"
depends_on: []
jules_session_id: null
pr_number: null
parent: story-030-046-standardize-orchestrator-test-factories
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Orchestrator Test Node Factory

## Objective
Implement a standardized test node factory utility in the DAG Orchestrator test suite to automatically populate valid frontmatter defaults. Refactor existing test fixtures to use it.

## Details
1. Added `createValidNode(overrides)` utility to `.github/scripts/foundry-orchestrator.test.ts`.
2. Utility dynamically maps `type` to valid `owner_persona`.
3. Refactored all `createNode` mock object calls to use `createValidNode`.
4. Tests verified with `pnpm test`.

## Acceptance Criteria
- [x] Test factory utility function is successfully implemented and accessible for tests.
- [x] Factory utility correctly assigns default frontmatter properties (e.g., valid `owner_persona` mapping based on node `type`).
- [x] Existing mock node configurations in `.github/scripts/foundry-orchestrator.test.ts` are entirely refactored to use the factory.
- [x] The full test suite runs and passes without schema validation warnings or errors on mock nodes.
