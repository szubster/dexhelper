---
id: task-018-scheduling-configuration
type: TASK
title: "Scheduling Configuration"
status: PENDING
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-006-scheduling-configuration.md
tags: ["infrastructure"]
rejection_count: 0
notes: ""
---

# Scheduling Configuration

Implement a generic scheduling configuration mechanism so that Foundry agents can be easily scheduled using their persona name and a standard cron expression.

## Context
The `.github/workflows/foundry-scheduled-agent.yml` reusable workflow exists and can execute a given `persona`. We now need the configuration and triggering mechanism that uses it.

## Technical Blueprint

1. **Configuration File**: Create `.foundry/config/agent-schedules.json`. The JSON should map personas to cron expressions. Example:
   ```json
   {
     "agile_coach": "47 2 * * *",
     "tpm": "0 * * * *"
   }
   ```
2. **Master Cron Workflow**: Create a new GitHub Actions workflow, e.g., `.github/workflows/foundry-cron.yml`.
   - It should trigger every hour or more frequently (e.g., `0 * * * *`).
   - It includes a job to read `agent-schedules.json`.
   - It calculates if the current time matches the cron expression for any agent using a small Node.js script (e.g., `.github/scripts/check-schedules.js` using `cron-parser`).
   - Output a list of due personas.
3. **Matrix Dispatch**: The master cron workflow should take the list of due personas and pass it to a matrix job. That job uses `uses: ./.github/workflows/foundry-scheduled-agent.yml` to trigger the actual agent runs in parallel.

## Acceptance Criteria
- [ ] Configuration file exists and maps personas to cron strings.
- [ ] Master cron workflow triggers on a schedule.
- [ ] Node.js script calculates which agents are due based on the current time and their cron expressions.
- [ ] Due agents are passed to `foundry-scheduled-agent.yml` via a matrix job.

*Verification*: I designate this task for **self-verification** by the coder. The coder must write unit tests for the cron-matching script and manually test the workflow (e.g., via `workflow_dispatch`) to ensure it triggers `foundry-scheduled-agent.yml` correctly.
