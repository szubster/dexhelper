---
id: epic-516-531-modify-scheduled-workflows
type: EPIC
title: Modify Scheduled Workflows for Issue Dispatch
status: PENDING
owner_persona: story_owner
created_at: '2026-09-07'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-419-516-scheduled-agents-dashboard
tags:
  - foundry
  - scheduled-agents
  - github-issues
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Modify Scheduled Workflows for Issue Dispatch

## Context & Problem Statement
The current scheduled agent workflows (`schedule-*.yml`) call the `foundry-scheduled-agent.yml` workflow directly. They need to be updated to instead create a GitHub Issue. Jules natively watches issues created by me (via API key) with the `jules` label, so creating the issue is all that is required to trigger execution. The existing cron triggers will be retained.

## Requirements
- Modify each `schedule-<persona>.yml` file in `.github/workflows/`.
- Replace the direct workflow call to `foundry-scheduled-agent.yml` with a step that creates a GitHub Issue via the `gh` cli or GitHub Script.
- The step must compile the full prompt context for the specific persona (using `.github/scripts/foundry-orchestrator.ts --compile-scheduled`) and inject this full prompt directly into the GitHub issue body.
- The command format: `gh issue create --title "Scheduled Agent: <persona>" --body "$COMPILED_PROMPT" --label "jules"`.

## Acceptance Criteria
- [x] Story Owner: Break down into STORY node(s) for implementation.
- [ ] story-531-558-modify-scheduled-workflows-impl
- [ ] story-531-559-modify-scheduled-workflows-e2e
