---
id: idea-419-scheduled-agents-dashboard
type: IDEA
title: Scheduled Agents Dashboard and Issue-Based Dispatch
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
  - github-issues
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Scheduled Agents Dashboard and Issue-Based Dispatch Options

## 1. Context & Problem Statement
The Foundry relies heavily on scheduled autonomous agents (e.g. `tpm`, `agile_coach`, `sweeper`, `shield`, `nurse`, `sentinel`, `visionary`, `strategist`, etc.) running on automated cron schedules defined in `.github/workflows/schedule-*.yml`.

Currently, while active DAG task executions are monitored and formatted into `ACTIVE_SESSIONS.md` by the Foundry Engine heartbeat and orchestrator, scheduled agent runs operate out-of-band:
1. Scheduled sessions spawn via `.github/workflows/foundry-scheduled-agent.yml` and post their session link to `$GITHUB_STEP_SUMMARY`.
2. There is no persistent Markdown dashboard or centralized tracking page recording recent scheduled agent execution history, outputs, or session links (e.g. last 5 Jules session links per agent).
3. Finding past session links for scheduled runs requires digging through GitHub Actions run histories.

Furthermore, the system currently employs GitHub Issues for error handling (e.g., self-healing DAG warnings and orchestrator execution failures tagged with `jules` label). Exploring whether scheduled agent dispatches should also migrate to GitHub Issue creation presents an architectural alternative worth analyzing.

---

## 2. Options & Architecture Exploration

### Option A: Scheduled Agents Markdown Dashboard (`SCHEDULED_SESSIONS.md`)
Maintain a dedicated Markdown dashboard in the root directory (or integrated into `ACTIVE_SESSIONS.md`) updated automatically upon every scheduled workflow run.
- **Mechanism:**
  - Update `.github/workflows/foundry-scheduled-agent.yml` with a step that invokes a script (e.g. `scripts/update-scheduled-dashboard.ts`).
  - Maintain a JSON/Markdown state file tracking the last $N$ (e.g., 5) execution session URLs, timestamps, personas, and completion statuses.
  - Render a clean Markdown table summarizing each agent persona's recent activity and direct links to their Jules session logs.
- **Pros:**
  - Lightweight, fast, non-intrusive.
  - Keeps repository-as-database pattern intact.
  - Direct parity with `ACTIVE_SESSIONS.md`.
- **Cons:**
  - Git commit collisions if multiple cron schedules run concurrently (requires rebase/retry logic or centralized workflow execution).

---

### Option B: Migration to GitHub Issue-Based Scheduled Dispatch
Instead of direct Jules API invocation in cron workflows, scheduled jobs create a GitHub Issue tagged with the `jules` label (or dedicated agent label like `jules:tpm`).
- **Mechanism:**
  - Cron workflow runs `gh issue create --title "Scheduled Agent Run: tpm" --body "..." --label "jules,scheduled"`.
  - Issue creation triggers an issue-reaction workflow or orchestrator pickup that dispatches Jules session.
  - Jules interacts with or references the GitHub Issue, providing native discussion threads, session link embeddings, and automatic issue closure upon completion.
- **Pros:**
  - Native GitHub tracking and searchability for all scheduled agent runs.
  - Integrates seamlessly with existing self-healing issue workflows (`foundry-engine.yml` issue creation).
  - Easy human oversight and commentary on agent runs.
  - Eliminates git commit conflicts on workflow run start since issue creation uses GitHub API.
- **Cons:**
  - Higher GitHub API issue noise/volume over time.
  - Requires issue lifecycle cleanup / retention policies (e.g., auto-closing or archiving old scheduled agent issues).

---

### Option C: Hybrid Approach (Issue Creation + Automated Dashboard Summary)
Combine Option A and Option B:
- Scheduled agent cron workflows create a tracking GitHub Issue for each run.
- The workflow updates a master `SCHEDULED_AGENTS.md` dashboard containing links to the last 5 GitHub Issues & Jules Sessions for each persona.

---

## 3. Next Steps & Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature proposal.
- [ ] Product Manager: Research trade-offs between Issue creation rate limits vs Markdown commit conflicts.
- [ ] Product Manager: Draft PRD detailing chosen path (Markdown Dashboard vs GitHub Issue Dispatch vs Hybrid), schema changes, and workflow modifications.
