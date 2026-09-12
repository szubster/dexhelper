---
id: task-558-564-scheduled-workflows-batch1-impl
type: TASK
title: Update Scheduled Workflows for Issue Dispatch (Batch 1)
status: READY
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-531-558-modify-scheduled-workflows-impl
tags:
  - foundry
  - scheduled-agents
  - github-issues
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Update Scheduled Workflows for Issue Dispatch (Batch 1)

## Description
This task involves modifying the first batch of `.github/workflows/schedule-*.yml` files to use GitHub Issues for dispatching Jules agents instead of calling the `foundry-scheduled-agent.yml` workflow directly.

Target files:
- `.github/workflows/schedule-agile-coach.yml`
- `.github/workflows/schedule-archivist.yml`
- `.github/workflows/schedule-bolt.yml`
- `.github/workflows/schedule-canvas.yml`
- `.github/workflows/schedule-infras.yml`
- `.github/workflows/schedule-lens.yml`
- `.github/workflows/schedule-mason.yml`

For each file:
1. Replace the direct workflow call to `foundry-scheduled-agent.yml` with a new job that creates a GitHub Issue.
2. The job must include `actions/checkout` to checkout the code.
3. The job must include `actions/setup-node` to set up Node.js.
4. Add a step to compile the full prompt context for the specific persona using:
   `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --compile-scheduled "<persona>"`
5. Inject this compiled prompt into the GitHub issue body by running:
   `gh issue create --title "Scheduled Agent: <persona>" --body "$COMPILED_PROMPT" --label "jules"`

## Acceptance Criteria
- [ ] `schedule-agile-coach.yml` through `schedule-mason.yml` are modified to create GitHub issues with the compiled prompt.
- [ ] Self-verification: run `pnpm lint` and ensure workflow syntax is valid.
