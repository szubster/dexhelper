---
id: idea-419-scheduled-agents-dashboard
type: IDEA
title: Scheduled Agents Dispatch via GitHub Issues and Execution Tracking
status: PENDING
owner_persona: product_manager
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
tags:
  - foundry
  - scheduled-agents
  - github-issues
  - zero-inbox
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Scheduled Agents Dispatch via GitHub Issues and Execution Tracking

## 1. Context & Problem Statement
The Foundry relies heavily on scheduled autonomous agents (e.g. `tpm`, `agile_coach`, `sweeper`, `shield`, `nurse`, `sentinel`, `visionary`, `strategist`, etc.) running on automated cron schedules defined in `.github/workflows/schedule-*.yml`.

Currently, while active DAG task executions are monitored and formatted into `ACTIVE_SESSIONS.md` by the Foundry Engine heartbeat and orchestrator, scheduled agent runs operate out-of-band:
1. Scheduled sessions spawn directly via `.github/workflows/foundry-scheduled-agent.yml` and post session links only to `$GITHUB_STEP_SUMMARY`.
2. There is no central issue thread or active workspace for humans to track, comment on, or assist scheduled agent sessions as they run.
3. Because scheduled agents execute on a low-frequency daily schedule (rather than rapid hourly cycles), missing or failing agent runs can go unnoticed without active issue tracking.

---

## 2. Recommended Approach: GitHub Issue-Based Scheduled Agent Dispatch

### Option A (Recommended): GitHub Issue Creation Trigger for Scheduled Agents
Instead of invoking the Jules session API directly inside cron workflows, daily scheduled workflows create a dedicated GitHub Issue tagged with the `jules` label (e.g. `gh issue create --title "Scheduled Agent: tpm" --body "..." --label "jules"`).

- **How it Fits the Maintainer's Zero-Inbox Workflow:**
  - **Active Oversight:** Creating an issue for each daily run surfaces the session directly into the maintainer's primary workspace (GitHub Issues).
  - **Automatic Closure via PR Merge:** When the scheduled agent completes its task and opens a PR with `Fixes #<issue_number>` or `Closes #<issue_number>`, merging the agent's PR automatically closes the tracking issue.
  - **Zero-Inbox Alignment:** Issues serve as actionable work items that naturally return the issue inbox to zero as PRs are reviewed and merged.
  - **Human Assistance:** If Jules needs clarification or hits a blocker, the maintainer can reply directly on the issue or assist Jules in context.
  - **Health Signal:** Open scheduled agent issues provide immediate visibility into pending or stuck agent runs.

---

### Option B (Alternative / Secondary): Markdown Summary Dashboard (`SCHEDULED_SESSIONS.md`)
Maintain a static Markdown dashboard in the root directory listing past execution links.
- **Evaluation:** A passive Markdown dashboard easily falls out of mind and lacks active notifications or automatic PR-link closing semantics. It can serve as a supplementary reference table, but is secondary to issue-based tracking.

---

## 3. Next Steps & Acceptance Criteria
- [x] Product Manager: Draft this IDEA node outlining the GitHub Issue-based dispatch for scheduled agents.
- [ ] Product Manager: Convert this IDEA into a PRD specifying workflow changes in `.github/workflows/schedule-*.yml` and `.github/workflows/foundry-scheduled-agent.yml` (e.g., issue creation, label handling, and `Closes #<issue_number>` prompt injection).
