---
id: story-030-046-standardize-orchestrator-test-factories
type: STORY
title: Standardize Orchestrator Test Factories
status: "READY"
owner_persona: tech_lead
created_at: '2026-05-09'
updated_at: "2026-05-10"
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-019-030-orchestrator-test-factories
tags: []
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Standardize Orchestrator Test Factories

## 1. Overview
Implement a standardized test node factory utility in the DAG Orchestrator test suite to automatically populate valid frontmatter defaults. This utility will prevent test fixtures from breaking due to unrelated strict schema validations, such as Phase 4.8 Mapping Validation. It ensures that the test suite remains robust as the system's schema evolves.

## 2. Requirements

### 2.1 Test Node Factory Utility
- Create a test utility function (e.g., `createValidNode(overrides)`) in `.github/scripts/foundry-orchestrator.test.ts` or an appropriate test utility file.
- The utility must return a complete, valid node object passing all strict schema checks, particularly Phase 4.8 Mapping Validation.
- Must dynamically map `type` to a valid `owner_persona`:
  - `IDEA` -> `product_manager`
  - `PRD` -> `epic_planner`
  - `EPIC` -> `story_owner`
  - `STORY` -> `tech_lead`
  - `TASK` -> `coder` or `qa`
  - `ADR` -> `architect`
- Must allow overriding any default field with custom values provided by the test via an `overrides` parameter.

### 2.2 Test Refactoring
- Systematically refactor existing test fixtures in `.github/scripts/foundry-orchestrator.test.ts` to utilize the new factory utility instead of hardcoded mock objects.

### 2.3 Non-Functional Requirements
- Ensure changes are isolated to the test suite, without altering actual orchestrator logic or production schema validations.
- Verify that the CI pipeline (`pnpm test` in `.github/scripts`) passes successfully after refactoring.

## 3. High-Level Acceptance Criteria
- [ ] Test factory utility function is successfully implemented and accessible for tests.
- [ ] Factory utility correctly assigns default frontmatter properties (e.g., valid `owner_persona` mapping based on node `type`).
- [ ] Existing mock node configurations in `.github/scripts/foundry-orchestrator.test.ts` are entirely refactored to use the factory.
- [ ] The full test suite runs and passes without schema validation warnings or errors on mock nodes.

## 4. Tasks to Spawn
1. Implement the node factory utility logic.
2. Refactor existing test fixtures to use the new factory.
