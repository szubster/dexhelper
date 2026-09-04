---
id: epic-516-530-adapt-foundry-scheduled-agent
type: EPIC
title: "Adapt foundry-scheduled-agent for Issue Triggers"
status: READY
owner_persona: story_owner
created_at: "2026-09-04"
updated_at: "2026-09-04"
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
rejection_reason: ""
notes: ""
---

# Adapt foundry-scheduled-agent for Issue Triggers

## Context & Problem Statement
Currently, `foundry-scheduled-agent.yml` is triggered directly via `workflow_call` and `workflow_dispatch`. We want it to be triggered by GitHub Issues instead to provide a human-visible dashboard of scheduled runs.

## Requirements
- Modify `foundry-scheduled-agent.yml` triggers to run on `issues` with `types: [opened]`.
- Verify the issue has the `jules` label and its title matches the `Scheduled Agent: <persona>` pattern.
- Extract the persona from the issue title and pass it to the orchestrator for prompt compilation.
- Inject a prompt instruction for the agent to append `Closes #<issue_number>` to its PR body so the issue automatically closes on merge.

## Acceptance Criteria
- [ ] Story Owner: Break down into STORY node(s) for implementation.
