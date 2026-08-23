---
id: idea-419-scheduled-agents-dashboard
type: IDEA
title: Scheduled Agents Dashboard and Execution Tracking Options
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
  - dashboard
  - zero-inbox
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Scheduled Agents Dashboard and Execution Tracking Options

## 1. Context & Problem Statement
The Foundry relies heavily on scheduled autonomous agents (e.g. `tpm`, `agile_coach`, `sweeper`, `shield`, `nurse`, `sentinel`, `visionary`, `strategist`, etc.) running on automated cron schedules defined in `.github/workflows/schedule-*.yml`.

Currently, while active DAG task executions are monitored and formatted into `ACTIVE_SESSIONS.md` by the Foundry Engine heartbeat and orchestrator, scheduled agent runs operate out-of-band:
1. Scheduled sessions spawn via `.github/workflows/foundry-scheduled-agent.yml` and post their session link to `$GITHUB_STEP_SUMMARY`.
2. There is no persistent Markdown dashboard or centralized tracking page recording recent scheduled agent execution history, outputs, or session links (e.g. last 5 Jules session links per agent).
3. Finding past session links for scheduled runs requires digging through GitHub Actions run histories.

### Key Operational Constraint: Zero-Inbox Issue Policy
The project maintainer actively maintains a strict **zero-inbox policy** on GitHub Issues, closing issues promptly as work is completed. Therefore, generating recurring GitHub Issues for routine scheduled agent runs is non-viable as it would pollute the issue tracker and disrupt the zero-inbox workflow.

---

## 2. Options & Architecture Exploration

### Option A (Recommended): Scheduled Agents Markdown Dashboard (`SCHEDULED_SESSIONS.md`)
Maintain a dedicated Markdown dashboard in the root directory (or as a table in `ACTIVE_SESSIONS.md`) updated automatically upon every scheduled workflow run.
- **Mechanism:**
  - Update `.github/workflows/foundry-scheduled-agent.yml` with a post-dispatch step that invokes a lightweight dashboard updater script (e.g. `scripts/update-scheduled-dashboard.ts`).
  - Store a JSON history buffer (e.g. `.foundry/data/scheduled_sessions_history.json`) keeping the last 5 session URLs, timestamps, personas, and outcome status for each persona.
  - Render a clean Markdown table (`SCHEDULED_SESSIONS.md`) summarizing each agent persona's recent runs with direct links to their Jules session logs.
- **Pros:**
  - Keeps the repository clean and respects the zero-inbox GitHub Issue policy.
  - Aligns cleanly with the existing repository-as-database architecture and `ACTIVE_SESSIONS.md` pattern.
  - Provides instant visibility into the last 5 session URLs for all scheduled personas.
- **Cons:**
  - Potential git commit collision during push if two cron schedules finish simultaneously (can be resolved with `git pull --rebase` re-try logic in the workflow step, identical to `foundry-engine.yml`).

---

### Option B (Evaluated & Disqualified): Migration to GitHub Issue-Based Scheduled Dispatch
Creating a GitHub Issue tagged with `jules` for each routine scheduled run was evaluated.
- **Evaluation & Rejection Reason:**
  - Violates the maintainer's strict zero-inbox issue policy.
  - High volume of routine cron runs would create constant issue noise.
  - Disqualified in favor of Markdown-based tracking (Option A).

---

## 3. Next Steps & Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature proposal.
- [ ] Product Manager: Convert this IDEA into a PRD detailing `SCHEDULED_SESSIONS.md` format, history JSON retention schema, and `foundry-scheduled-agent.yml` update steps.
