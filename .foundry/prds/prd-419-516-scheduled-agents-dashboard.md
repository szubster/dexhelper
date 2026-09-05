---
id: prd-419-516-scheduled-agents-dashboard
type: PRD
title: "GitHub Issue-Based Scheduled Agent Dispatch"
status: READY
owner_persona: epic_planner
created_at: "2026-09-02"
updated_at: "2026-09-02"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-419-scheduled-agents-dashboard
tags:
  - foundry
  - scheduled-agents
  - github-issues
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Product Requirements Document: GitHub Issue-Based Scheduled Agent Dispatch

## Context & Problem Statement
Currently, scheduled autonomous agents run out-of-band directly from `.github/workflows/foundry-scheduled-agent.yml` via cron jobs. This lacks a human-visible dashboard or issue thread, making it difficult to monitor runs or assist agents. Actionable items should appear in GitHub Issues to support a zero-inbox workflow.

## Requirements
### 1. Workflow Modifications for `schedule-*.yml`
- Instead of calling `foundry-scheduled-agent.yml`, each `schedule-<persona>.yml` should execute a step that creates a GitHub Issue.
- Command example: `gh issue create --title "Scheduled Agent: <persona>" --body "Scheduled run for <persona>." --label "jules"`
- The existing cron triggers will be retained.

### 2. Adaptation of `foundry-scheduled-agent.yml`
- It should trigger on `issues` with `types: [opened]`.
- It must verify the issue has the `jules` label and its title matches the `Scheduled Agent: <persona>` pattern.
- The workflow should extract the persona from the issue title and pass it to the orchestrator for prompt compilation.
- It must inject a prompt instruction for the agent to append `Closes #<issue_number>` to its PR body so the issue automatically closes on merge.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into EPIC(s) for modifying the GitHub workflows.
