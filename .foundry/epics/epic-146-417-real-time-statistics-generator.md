---
id: epic-146-417-real-time-statistics-generator
type: EPIC
title: Real-Time Statistics Generator & Orchestrator Integration
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '9781704663363640058'
pr_number: null
parent: prd-146-001-foundry-system-statistics
tags:
  - orchestrator
  - metrics
  - statistics
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Epic: Real-Time Statistics Generator & Orchestrator Integration

## Objective
Implement a real-time statistics generation module that runs at the end of each Orchestrator or Heartbeat run to compute PR metrics and Node state metrics. It must output a unified JSON schema and Markdown report, automatically committing them to the root directory.

## Requirements
1. **Module Creation**: Create `.github/scripts/utils/statistics.ts` to house the counting and generation logic.
2. **Node Scanning**: Scan `.foundry/` recursively to count nodes by type and status, parsing their YAML frontmatter. Ensure it correctly categorizes and includes archived nodes from `.foundry/archive/`.
3. **PR Metrics**: Fetch PR metrics via `gh pr list --state all --json` to compile data on total PRs, merged PRs, etc.
4. **Report Output**: Generate `foundry-statistics.json` and `foundry-statistics.md` at the repository root.
5. **Orchestrator Integration**: Integrate this module into `.github/scripts/foundry-orchestrator.ts` or `.github/workflows/foundry-heartbeat.yml` to trigger after each run and auto-commit if there are changes.

## Acceptance Criteria
- [ ] Break down this Epic into Stories, ensuring the final STORY is dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
