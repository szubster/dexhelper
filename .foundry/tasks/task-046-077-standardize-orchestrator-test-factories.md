---
id: task-046-077-standardize-orchestrator-test-factories
type: TASK
title: Implement Test Node Factory Utility
status: ACTIVE
owner_persona: coder
created_at: '2026-05-10'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: '14790392855257797686'
pr_number: null
parent: story-030-046-standardize-orchestrator-test-factories
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Test Node Factory Utility

## 1. Overview
Implement a test utility function `createValidNode(overrides)` in `.github/scripts/foundry-orchestrator.test.ts` (or a dedicated test utils file) to automatically generate valid test nodes that pass strict schema validation (like Phase 4.8 Mapping Validation). Also refactor existing test fixtures to use this utility.

## 2. Requirements

### 2.1 Test Node Factory Utility
- Create a test utility function (e.g., `createValidNode(overrides)`) accessible to the orchestrator test suite.
- The utility must return a complete, valid node object passing all strict schema checks, particularly Phase 4.8 Mapping Validation.
- Must dynamically map `type` to a valid `owner_persona`:
  - `IDEA` -> `product_manager`
  - `PRD` -> `epic_planner`
  - `EPIC` -> `story_owner`
  - `STORY` -> `tech_lead`
  - `TASK` -> `coder` or `qa`
  - `ADR` -> `architect`
- Must allow overriding any default field with custom values provided by the test via an `overrides` parameter.
- Refactor the existing `createNode` helper to use this frontmatter generation utility rather than using hardcoded multi-line strings, or create a new `createValidTestNode` utility.

### 2.2 Test Refactoring
- Systematically refactor existing test fixtures in `.github/scripts/foundry-orchestrator.test.ts` to utilize the new factory utility instead of hardcoded mock objects.

### 2.3 Non-Functional Requirements
- Ensure changes are isolated to the test suite, without altering actual orchestrator logic or production schema validations.
- Verify that the CI pipeline (`pnpm test` in `.github/scripts`) passes successfully after refactoring.

## 3. Acceptance Criteria
- [ ] Test factory utility function is successfully implemented.
- [ ] Factory utility correctly assigns default frontmatter properties (e.g., valid `owner_persona` mapping based on node `type`).
- [ ] Existing mock node configurations in `.github/scripts/foundry-orchestrator.test.ts` are refactored to use the factory.
- [ ] The full test suite runs and passes without schema validation warnings or errors on mock nodes.
