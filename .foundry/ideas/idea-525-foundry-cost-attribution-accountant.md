---
id: idea-525-foundry-cost-attribution-accountant
type: IDEA
title: Implement Foundry Cost Attribution via the Accountant Persona
status: PENDING
owner_persona: product_manager
created_at: '2026-09-17T02:33:11Z'
updated_at: '2026-09-17T02:33:11Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - orchestrator
  - metrics
  - cost
  - telemetry
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Implement Foundry Cost Attribution via the Accountant Persona

## Context & Problem Statement
The Foundry DAG operates efficiently, but currently, there is no granular observability into the compute and token costs associated with executing different node types, agent personas, or specific sub-trees (Epics/Stories). As the factory scales, it is critical to understand the cost-to-value ratio of our autonomous execution pipeline. Without this, we cannot identify whether certain generative paths (like automated QA or deep RAG context hydration) are too expensive compared to the value they provide, or if specific agents are consuming disproportionate compute.

## Proposed Solution
Introduce a new Foundry system persona: **The Accountant** (following the Gen 1 gamification theme, this could be "Meowth (Pay Day)" or similar).

The Accountant's responsibilities and the system changes include:
1. **Cost Telemetry Injection:** Instrument the DAG Orchestrator (`foundry-orchestrator.ts`) to capture execution metadata per session (e.g., token usage, bash execution time, API calls). This metadata should be written to a local `.foundry/telemetry/` directory.
2. **Cost Aggregation Pipeline:** The Accountant persona wakes up periodically (e.g., as a scheduled agent or triggered when an Epic completes) to parse the telemetry logs and aggregate the costs.
3. **Attribution Reporting:** The Accountant generates a breakdown of costs attributed to specific nodes (e.g., "Epic-402 cost X tokens and Y compute hours to complete"), specific personas (e.g., "The Coder persona accounts for 60% of total compute"), and individual node state transitions (e.g., "Resurrection loops cost X").
4. **Integration with `idea-146`:** These financial metrics should be integrated into the existing unified statistics document proposed in `idea-146-foundry-system-statistics`.

## Strategic Value
By surfacing the true cost of autonomous execution, maintainers can optimize prompts, prune inefficient RAG pipelines, and make data-driven decisions on when to deploy heavyweight agents vs. lightweight deterministic scripts. This strictly focuses on the Foundry System domain, maintaining the required 50/50 balance.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD detailing the telemetry schema, the Accountant persona's dispatch triggers, and the structure of the cost attribution report.
