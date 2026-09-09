---
id: idea-521-foundry-persona-execution-time-profiler
type: IDEA
title: Foundry Persona Execution Time Profiler
status: READY
owner_persona: product_manager
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - metrics
  - profiling
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Foundry Persona Execution Time Profiler

## Context & Problem Statement
The Foundry operates as an autonomous software factory, delegating work to various specialized personas (Coder, QA, Architect, etc.). Currently, while we track the status of nodes and the overall velocity of the pipeline (e.g., via IDEA-146 System Statistics), we lack granular visibility into how long individual personas take to execute their specific tasks. Understanding these execution durations is critical for identifying bottlenecks, optimizing persona prompts for efficiency, and managing compute resources effectively.

## Proposed Solution
We propose adding an execution time profiling subsystem to the Foundry Orchestrator.

1. **Instrumentation**: Instrument the `.github/scripts/foundry-orchestrator.ts` and related GitHub Actions workflows to record the exact timestamp when a node transitions to `ACTIVE` (assigned to a persona) and when it transitions out of `ACTIVE` (e.g., to `VERIFYING`, `COMPLETED`, or `FAILED`).
2. **Data Aggregation**: Store this profiling data. It could be appended to the root `foundry-statistics.json` file or maintained in a dedicated `foundry-profiling.json` file.
3. **Metrics Generation**: Calculate and report key metrics such as:
   - Average execution time per persona.
   - P95 and P99 execution times per persona.
   - Execution time grouped by node type (`TASK`, `STORY`, `PRD`, etc.).

## Value Proposition
- Provides data-driven insights into persona performance, highlighting which roles or task types are consuming the most time.
- Enables targeted optimization of persona prompts and execution environments to reduce latency and cost.
- Helps the Agile Coach and TPM personas identify chronic slow spots in the DAG pipeline that may require architectural changes or task decomposition strategies.
