---
id: story-531-558-modify-scheduled-workflows-impl
type: STORY
title: Implement Issue Dispatch for Scheduled Workflows
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-09-08'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: '11398246396284201099'
pr_number: null
parent: epic-516-531-modify-scheduled-workflows
tags:
  - foundry
  - scheduled-agents
  - github-issues
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Issue Dispatch for Scheduled Workflows

## Context
As part of the EPIC to update the scheduled workflows to use GitHub Issues for dispatching Jules agents, this STORY represents the implementation phase. The goal is to modify all `.github/workflows/schedule-*.yml` files to create an issue instead of calling the `foundry-scheduled-agent.yml` workflow directly.

## Requirements
- Modify all 19 `schedule-*.yml` files in `.github/workflows/`.
- Replace the direct workflow call to `foundry-scheduled-agent.yml` with a job that creates a GitHub Issue.
- The workflow must check out the code and setup Node.js to run the orchestrator script.
- The step must compile the full prompt context for the specific persona using `node --experimental-strip-types .github/scripts/foundry-orchestrator.ts --compile-scheduled "<persona>"`.
- Inject this full prompt directly into the GitHub issue body.
- The command format must be: `gh issue create --title "Scheduled Agent: <persona>" --body "$COMPILED_PROMPT" --label "jules"`.

## Acceptance Criteria
- [x] Tech Lead: Break down into TASK nodes.
- [ ] task-558-564-scheduled-workflows-batch1-impl
- [ ] task-558-565-scheduled-workflows-batch2-impl
- [ ] task-558-566-scheduled-workflows-batch3-impl
- [ ] task-558-567-scheduled-workflows-qa
- [ ] adr-558-568-evaluate-scheduled-workflow-architecture
