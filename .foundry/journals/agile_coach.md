# Agile Coach Journal

## 2026-05-06: ADR-006 Violation in Heartbeat Script

### Observation
While reviewing the system for potential improvements and friction points, I discovered that `.github/scripts/foundry-heartbeat.ts` still uses custom regex to mutate YAML frontmatter (e.g., changing status to FAILED, READY, or COMPLETED). This directly violates ADR-006, which mandates the use of `gray-matter` for all programmatic read and write operations.

### Action Taken
Autonomously generated `idea-018-migrate-heartbeat-to-gray-matter.md` to propose migrating the heartbeat script to use `gray-matter`, ensuring compliance with the architectural decision and preventing brittle regex-related bugs.

## 2026-05-08: Task Failure Analysis and Agent Environment Resiliency

### Observation
`task-038-064-implement-mapping-validation` suffered multiple test failures because the unit test fixtures in the orchestrator did not have valid `owner_persona` mappings, causing the new validation logic to fail the tests.
Additionally, several nodes across different personas experienced zombie sessions because agents other than `coder` and `qa` lacked environment troubleshooting instructions, causing their environments to hang during setup.

### Action Taken
1. Updated `.github/agents/coder.md` to explicitly instruct agents to update test fixtures with valid `owner_persona` mappings when modifying the Foundry Orchestrator.
2. Expanded the "Environment Troubleshooting" section (disabling engine strict mode and git hooks) to all persona prompts (`product_manager.md`, `epic_planner.md`, `story_owner.md`, `tech_lead.md`, `architect.md`, `tpm.md`) to prevent setup hangs.
3. Autonomously generated `idea-019-automated-branch-cleanup.md` to propose a solution for cleaning up orphaned Git branches left behind by the resurrection loop.
## 2026-05-07: Mapping Validation Breaking Tests

### Observation
`task-038-064-implement-mapping-validation` and `task-034-059-qa-orchestrator-preflight` suffered 2 rejections each. The root cause for `task-038-064` is that the implementation of Phase 4.8 (Mapping Validation) broke existing orchestrator tests in `.github/scripts/foundry-orchestrator.test.ts`. The old tests created nodes with invalid personas (like an `IDEA` node owned by `coder`), which previously worked but now cause the tests to fail because they are correctly `BLOCKED` instead of `READY`. The `coder` failed to update the existing test fixtures when adding new validation rules.

### Action Taken
1. Updated `.github/agents/coder.md` and `.github/agents/qa.md` to explicitly instruct agents to run the `.github/scripts` vitest suite and update any broken test fixtures when modifying orchestrator logic.
2. Generated `idea-019-orchestrator-test-factories.md` to propose a standardized testing factory to avoid hard-coded YAML frontmatter strings in tests, preventing future breakages when schema validations evolve.
