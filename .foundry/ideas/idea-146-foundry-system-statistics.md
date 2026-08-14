---
id: idea-146-foundry-system-statistics
type: IDEA
title: Implement Foundry System Statistics Reporting and Backfilling
status: PENDING
owner_persona: product_manager
created_at: '2026-08-11'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
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

# Idea: Implement Foundry System Statistics Reporting and Backfilling

## Context & Problem Statement
The Foundry operates as an autonomous software factory where a DAG of node files (Ideas, PRDs, Epics, Stories, Tasks) determines the software lifecycle. Currently, there is no centralized, real-time reporting of high-level performance and structural metrics of this system.

To evaluate pipeline health and productivity, we need visibility into:
1. **Pull Request Metrics**: The volume of pull requests opened and merged, including the fraction of pull requests that were auto-merged by the system vs. those requiring manual intervention.
2. **Node Metrics**: The absolute counts and breakdowns of Foundry nodes by status (e.g., `PENDING`, `READY`, `ACTIVE`, `VERIFYING`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`), by type (e.g., `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`), and a matrix of type-then-status (e.g., how many `TASK` nodes are currently `ACTIVE` or `COMPLETED`).

As the system evolves, new metrics and ideas will inevitably emerge. Therefore, we also need a robust way to backfill these statistics from the repository's git history.

## Proposed Solution
We propose adding an automated statistics generator to the Foundry Orchestrator.

### 1. Unified Statistics Document (Root Location)
A structured statistics file (e.g., `foundry-statistics.json`, `foundry-statistics.yaml`, or `foundry-statistics.md` containing markdown tables and JSON blocks) **must be stored in the root directory of the repository** (not in any subdirectory like `.foundry/docs/` or `.foundry/`). This keeps the statistics immediately accessible and prominent at the top level of the workspace.

The file will contain:
- **PR Metrics**: Total PRs, Auto-merged PRs, Auto-merge success rate.
- **Node Status Counts**: A flat dictionary or table of statuses and their counts.
- **Node Type Counts**: A flat dictionary or table of types and their counts.
- **Type-then-Status Breakdown Matrix**: A 2D breakdown (e.g., `type` as rows, `status` as columns).

### 2. Almost Real-Time Orchestrator Integration
The statistics generator script will be integrated directly into the orchestrator runner or as a GitHub Actions workflow step. Each time the orchestrator executes a cycle and commits state changes, it will dynamically recalculate the statistics and commit them directly to the `main` branch, ensuring they are kept in almost real-time.

### 3. Git History Backfilling Engine
We will develop a standalone backfilling CLI utility. This utility will:
- Traverse the repository's Git history (commits on `main`).
- Check out or analyze the files at each commit or daily intervals.
- Parse the state of the `.foundry/` directory at each historical point.
- Query GitHub API or inspect git reflogs to extract historical PR and merge events.
- Generate a timeline of historical statistics, enabling retro-active trend analysis.

## Value Proposition
This feature transforms the Foundry from an opaque workflow engine into a data-driven factory. By providing immediate metrics and historical backfilling:
- Engineers and product managers can pinpoint bottlenecks (e.g., disproportionately high numbers of `BLOCKED` or `FAILED` nodes).
- The Agile Coach and TPM can track autonomous throughput (e.g., auto-merge ratios and cycle velocities).
- It provides an extensible framework to easily append new metrics as the team comes up with more ideas during development.

## Acceptance Criteria
- [x] Product Manager: Draft a comprehensive PRD detailing the statistics schema, git history parser, and real-time generation triggers.
- [ ] Implement an automated statistics calculation script under `.github/scripts/` that parses the current state of `.foundry/` and outputs metrics to a root file (e.g., `foundry-statistics.json`, `foundry-statistics.yaml` or `foundry-statistics.md`).
- [ ] Integrate statistics generation into the orchestrator/heartbeat workflow so that statistics are updated and auto-committed to the `main` branch at the root of the repository.
- [ ] Implement a backfilling CLI script capable of reconstructing historical statistics by parsing git history and commit states.

### Downstream Graph Nodes
- [ ] `.foundry/prds/prd-146-001-foundry-system-statistics.md`
