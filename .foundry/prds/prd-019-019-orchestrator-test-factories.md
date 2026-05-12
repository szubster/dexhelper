---
id: prd-019-019-orchestrator-test-factories
type: PRD
title: Standardized Orchestrator Test Factories
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-05-08'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: '2573853909337821732'
pr_number: null
parent: idea-019-orchestrator-test-factories
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Product Requirements Document: Standardized Orchestrator Test Factories

## 1. Goal
Implement a standardized test node factory utility in the DAG Orchestrator test suite to automatically populate valid frontmatter defaults. This will prevent test fixtures from breaking due to unrelated strict schema validations, such as Phase 4.8 Mapping Validation.

## 2. Background
As the DAG Orchestrator enforces stricter validation rules on node properties (e.g., ensuring an `IDEA` node is owned by the `product_manager`), existing tests often fail because they use mock nodes with invalid or nonsensical frontmatter combinations.
These failures cause CI delays and force developers to constantly update test fixtures when unrelated rules are introduced.

## 3. Requirements

### 3.1 Functionality
- Create a test utility function (e.g., `createValidNode(overrides)`) in `.github/scripts/foundry-orchestrator.test.ts` or a related test utility file.
- The utility must return a complete, valid node object that passes all strict schema checks, including Phase 4.8 Mapping Validation.
- It must map `type` to a valid `owner_persona`:
  - `IDEA` -> `product_manager`
  - `PRD` -> `epic_planner`
  - `EPIC` -> `story_owner`
  - `STORY` -> `tech_lead`
  - `TASK` -> `coder` or `qa`
  - `ADR` -> `architect`
- The utility must support overriding any default field with custom values provided by the test via an `overrides` parameter.
- Refactor existing test fixtures in `.github/scripts/foundry-orchestrator.test.ts` to use this new utility instead of hardcoded mock objects, where applicable.

### 3.2 Non-Functional Requirements
- The changes should only affect the test suite and should not alter the actual orchestrator logic or production schema validations.
- The CI pipeline (`pnpm test` in `.github/scripts`) must pass successfully.

## 4. Acceptance Criteria
- [ ] A test factory utility function is implemented and exported for use in test files.
- [ ] The utility correctly sets default frontmatter properties, ensuring compliance with strict schema rules (e.g., valid `owner_persona` for each node `type`).
- [ ] Existing tests in `.github/scripts/foundry-orchestrator.test.ts` are updated to use the factory utility.
- [ ] All tests pass without any warnings or errors related to schema validation on mock nodes.

## 5. Implementation Strategy
1. **Define the Factory:** Create the factory function, defining a baseline valid node and merging it with the provided overrides. Ensure the logic correctly assigns `owner_persona` based on the (potentially overridden) `type`.
2. **Refactor Tests:** Systematically replace inline mock node definitions in `.github/scripts/foundry-orchestrator.test.ts` with calls to the new factory.
3. **Verify:** Run the test suite (`pnpm test`) to ensure no regressions and that the factory correctly supports the required test scenarios.

## Derived Epics
- .foundry/epics/epic-019-030-orchestrator-test-factories.md
