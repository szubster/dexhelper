---
id: prd-146-001-foundry-system-statistics
type: PRD
title: Foundry System Statistics Reporting and Backfilling PRD
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-11'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-146-foundry-system-statistics
tags:
  - orchestrator
  - metrics
  - statistics
  - database
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Foundry System Statistics Reporting and Backfilling

## Context & Problem Statement
The Foundry operates as an autonomous software factory where a DAG of node files (Ideas, PRDs, Epics, Stories, Tasks) determines the software lifecycle. Currently, there is no centralized, real-time reporting of high-level performance and structural metrics of this system.

To evaluate pipeline health and productivity, we need visibility into:
1. **Pull Request Metrics**: The volume of pull requests opened and merged, including the fraction of pull requests that were auto-merged by the system vs. those requiring manual intervention.
2. **Node Metrics**: The absolute counts and breakdowns of Foundry nodes by status (e.g., `PENDING`, `READY`, `ACTIVE`, `VERIFYING`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`), by type (e.g., `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`), and a matrix of type-then-status (e.g., how many `TASK` nodes are currently `ACTIVE` or `COMPLETED`).

As the system evolves, new metrics and ideas will inevitably emerge. Therefore, we also need a robust way to backfill these statistics from the repository's git history.

## Proposed Solution
We propose adding an automated statistics generator to the Foundry Orchestrator, alongside a standalone history backfilling script.

### 1. Unified Statistics Document Schema
A structured JSON statistics file `foundry-statistics.json` and a markdown file `foundry-statistics.md` **must be stored in the root directory of the repository**. This keeps the statistics immediately accessible and prominent at the top level of the workspace for both programmatic and human consumption.

The JSON schema should resemble:
```json
{
  "last_updated": "2026-08-11T12:00:00Z",
  "pr_metrics": {
    "total_prs": 150,
    "auto_merged_prs": 120,
    "manual_merged_prs": 20,
    "closed_not_merged_prs": 10,
    "auto_merge_success_rate": 0.80
  },
  "node_status_counts": {
    "PENDING": 10,
    "READY": 5,
    "ACTIVE": 2,
    "VERIFYING": 1,
    "COMPLETED": 100,
    "FAILED": 3,
    "BLOCKED": 1,
    "CANCELLED": 4
  },
  "node_type_counts": {
    "IDEA": 20,
    "PRD": 15,
    "EPIC": 10,
    "STORY": 30,
    "TASK": 50,
    "RESEARCH": 0,
    "ADR": 1
  },
  "type_status_matrix": {
    "TASK": {
      "COMPLETED": 40,
      "ACTIVE": 2,
      "FAILED": 2,
      "PENDING": 6
    },
    "IDEA": {
      "COMPLETED": 15,
      "ACTIVE": 5
    }
  }
}
```

### 2. Real-Time Generation Triggers & Orchestrator Integration
The statistics calculation logic should be modularized (e.g., in `.github/scripts/utils/statistics.ts`).
- **Trigger**: The orchestrator (`.github/scripts/foundry-orchestrator.ts`) or heartbeat workflow (`.github/workflows/foundry-heartbeat.yml`) will invoke this logic at the end of each run.
- **Workflow**:
  1. The script recursively scans the `.foundry/` directory to count nodes by type and status, parsing YAML frontmatter.
  2. It queries the GitHub API (via `gh pr list --state all --json`) to compile PR metrics.
  3. It generates both the `foundry-statistics.json` file and a human-readable `foundry-statistics.md` file containing markdown tables.
  4. If either file has changed, it automatically commits the updates directly to the `main` branch.

### 3. Git History Parser (Backfilling Engine)
We will develop a standalone CLI utility, `foundry-backfill-stats.ts`, located under `.github/scripts/`.
- **Workflow**:
  1. The script accepts a parameter for the interval (e.g., `--daily`, or specific commit SHAs).
  2. It iterates through the git commit history of the `main` branch.
  3. For each target commit, it checks out the `.foundry/` directory in a temporary location or reads the tree blob directly.
  4. It parses the nodes at that specific point in time to reconstruct the `node_status_counts` and `node_type_counts`.
  5. It can output a time-series dataset (e.g., `foundry-historical-stats.json` or CSV format) to enable retroactive trend analysis of pipeline health over time.

## Value Proposition
This feature transforms the Foundry from an opaque workflow engine into a data-driven factory. By providing immediate metrics and historical backfilling:
- Engineers and product managers can pinpoint bottlenecks (e.g., disproportionately high numbers of `BLOCKED` or `FAILED` nodes).
- The Agile Coach and TPM can track autonomous throughput (e.g., auto-merge ratios and cycle velocities).
- It provides an extensible framework to easily append new metrics as the team comes up with more ideas during development.

## Acceptance Criteria
- [x] Break down this PRD into an Epic.
- [ ] epic-146-417-real-time-statistics-generator
- [ ] epic-146-418-historical-statistics-backfilling
