---
id: idea-524-persona-performance-analytics-dashboard
type: IDEA
title: Persona Performance Analytics Dashboard
status: PENDING
owner_persona: product_manager
created_at: '2026-09-16T05:07:16Z'
updated_at: '2026-09-16T05:07:16Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - analytics
  - metrics
research_references: []
rejection_count: 0
rejection_reason: ''
locks: []
---

# Idea: Persona Performance Analytics Dashboard

## Context & Problem Statement
The Foundry system relies on multiple specialized AI personas (e.g., `coder`, `qa`, `architect`, `story_owner`) to autonomously transition nodes through the DAG. As the system scales, it becomes difficult for maintainers (the human "CEO" or `tpm`) to identify which personas are struggling, which prompts need tuning, or which tasks are disproportionately bottlenecking the pipeline.

While we have execution time profiling (IDEA-521) and confidence metrics (IDEA-521), there is no centralized, holistic view that tracks the historical success rate and performance of each persona over time.

## Proposed Strategy
Introduce a "Persona Performance Analytics Dashboard" as a companion to the Foundry DAG visualizer. This dashboard will aggregate data across all historical and active nodes to provide actionable insights into persona efficiency.

1. **Metrics Aggregation**: The orchestrator will parse completed and failed nodes to aggregate key metrics per persona, such as:
   - **First-Time Pass Rate (FTPR)**: The percentage of nodes completed without triggering a Resurrection Loop (i.e., `rejection_count == 0`).
   - **Average Rejection Count**: The mean number of times a persona's work is rejected by QA or Auditors.
   - **Time-to-Resolution (TTR)**: The average duration a node spends assigned to a specific persona before transitioning to the next state.
   - **Permanent Failure Rate**: The percentage of nodes assigned to a persona that ultimately result in a `CANCELLED` status.
2. **Visual Dashboard**: Create a web-based UI (potentially within the existing Scheduled Agents Dashboard from IDEA-419) displaying these metrics using charts, heatmaps, and a gamified "Leaderboard" to easily spot underperforming personas.
3. **Automated Alerts**: If a persona's FTPR drops below a critical threshold (e.g., < 50% over a moving window of 20 tasks), the system automatically flags the `agile_coach` or `tpm` to review and refine that persona's base prompt instructions.

## Value Proposition
- **Targeted Prompt Engineering**: Identifies exactly which personas are struggling, allowing maintainers to focus prompt-tuning efforts where they are needed most.
- **System Observability**: Transitions Foundry from a black-box execution engine into a measurable, data-driven software factory.
- **Proactive Maintenance**: Automated alerts prevent long-term degradation in pipeline throughput.

## Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature request.
- [ ] prd-524-580-persona-performance-analytics-dashboard
