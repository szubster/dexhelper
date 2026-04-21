---
id: task-001-create-engine-yaml
type: TASK
title: "Core Foundry Orchestration Engine"
status: COMPLETED
owner_persona: tech_lead
created_at: "2026-04-20"
updated_at: "2026-04-20"
depends_on:
  - .foundry/stories/story-001-matrix-runner.md
jules_session_id: null
parent: .foundry/stories/story-001-matrix-runner.md
---

# Core Foundry Orchestration Engine

Implementation of `.github/workflows/foundry-engine.yml`. This workflow is the central nervous system of The Foundry.

## Acceptance Criteria
- [ ] Workflow triggers on a `workflow_dispatch` (manual) or `schedule` (cron).
- [ ] It executes `npx tsx .github/scripts/foundry-orchestrator.ts` to find `READY` nodes.
- [ ] It parses the JSON output and initializes a GitHub Actions matrix.
- [ ] For each node in the matrix, it triggers a specialized "Jules Session" job.
- [ ] It transitions nodes from `READY` to `ACTIVE` by updating their frontmatter with the current `GITHUB_RUN_ID`.

## Technical Notes
- Use `actions/checkout` with a PAT or specific SSH key if write access is needed for status updates.
- Capture the orchestrator output using a job output variable.
