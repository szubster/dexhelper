---
id: task-558-565-scheduled-workflows-batch2-impl
type: TASK
title: Update Scheduled Workflows for Issue Dispatch (Batch 2)
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

# Update Scheduled Workflows for Issue Dispatch (Batch 2)

## Description
This task involves modifying the second batch of `.github/workflows/schedule-*.yml` files to use GitHub Issues for dispatching Jules agents instead of calling the `foundry-scheduled-agent.yml` workflow directly.

Target files:
- `.github/workflows/schedule-nurse.yml`
- `.github/workflows/schedule-oak.yml`
- `.github/workflows/schedule-palette.yml`
- `.github/workflows/schedule-scribe.yml`
- `.github/workflows/schedule-sculptor.yml`
- `.github/workflows/schedule-sentinel.yml`
- `.github/workflows/schedule-shield.yml`

For each file:
1. Replace the direct workflow call to `foundry-scheduled-agent.yml` with a new job that creates a GitHub Issue.
2. The job must include steps to checkout the code and setup Node.js.
3. Add a step to compile the full prompt context for the specific persona using:
   `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --compile-scheduled "<persona>"`
4. Inject this compiled prompt into the GitHub issue body by running:
   `gh issue create --title "Scheduled Agent: <persona>" --body "$COMPILED_PROMPT" --label "jules"`

## Acceptance Criteria
- [ ] `schedule-nurse.yml` through `schedule-shield.yml` are modified to create GitHub issues with the compiled prompt.
- [ ] Self-verification: run `pnpm lint` and ensure workflow syntax is valid.
