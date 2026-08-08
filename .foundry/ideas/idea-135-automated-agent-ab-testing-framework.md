---
id: idea-135-automated-agent-ab-testing-framework
type: IDEA
title: Automated Agent A/B Testing Framework
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-05'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: '3690536818887696381'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - optimization
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Automated Agent A/B Testing Framework

## Problem
Currently, when a persona (e.g., `coder`, `qa`) fails a task or produces suboptimal code, we rely on manual observation to tweak their system prompts or alter the `owner_persona` mappings. The Foundry multi-agent system lacks a systematic way to measure the performance impact of prompt engineering or alternative persona configurations.

## Proposed Solution
Introduce an **Automated Agent A/B Testing Framework** natively within the Foundry Orchestrator.
1. **Experiment Definition:** Allow nodes (or the Orchestrator config) to define a/b test variants for tasks. For example, a complex algorithm task could be assigned to `Variant A: standard coder prompt` and `Variant B: analytical coder prompt`.
2. **Parallel Execution:** The Orchestrator clones the node and dispatches both variants to separate agents simultaneously.
3. **Automated Evaluation:** The QA persona evaluates both outputs. The framework measures objective metrics: QA acceptance rate, number of rejection cycles (`rejection_count`), and execution time.
4. **Winning Variant Selection:** The variant that passes QA with the lowest rejection count and execution time is merged, and the other is discarded. The orchestrator logs the result to `.foundry/docs/knowledge_base/prompt-learnings.md`.

## Value Proposition
This transforms the Foundry from a static execution pipeline into a self-optimizing system. By systematically A/B testing agent prompts and configurations, we can continuously refine the "factory floor" to yield higher quality code with fewer rework cycles, directly improving the velocity of the entire multi-agent pipeline.

## Acceptance Criteria
- [x] Product Manager: Draft a PRD detailing the schema changes for node experiments and the orchestrator logic for parallel variant execution and selection.
- [ ] prd-135-340-automated-agent-ab-testing-framework
