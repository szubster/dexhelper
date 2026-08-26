---
id: idea-422-llm-cost-usage-metrics-dashboard
type: IDEA
title: LLM Cost & Token Usage Metrics Dashboard
status: PENDING
author: visionary
owner_persona: product_manager
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - metrics
  - cost
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: LLM Cost & Token Usage Metrics Dashboard

## Context
The Foundry system orchestrates numerous automated agents running complex multi-step tasks. Currently, we track pipeline throughput and failure rates (via `foundry-statistics`), but we lack visibility into the financial operational costs of the pipeline. Some personas or specific DAG structures might be significantly more token-intensive than others.

## Proposal
Implement an LLM Cost & Token Usage tracking system.
1. The heartbeat/session teardown script will extract token usage metrics (prompt tokens, completion tokens) from the Jules/LLM session outputs.
2. These metrics will be aggregated per persona, per macro-node (Epic/Story), and globally over time.
3. A new dashboard view (or section in the existing Foundry statistics report) will visualize this data, allowing the Agile Coach to optimize prompts for cost-efficiency.

## Value Proposition
This ensures the long-term sustainability of the autonomous software factory by providing the observability needed to prevent token bloat and optimize the most expensive agent workflows.

## Next Steps
- [ ] Product Manager: Draft PRD for LLM Cost Metrics extraction and reporting.
