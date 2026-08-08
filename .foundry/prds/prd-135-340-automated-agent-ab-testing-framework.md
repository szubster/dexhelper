---
id: prd-135-340-automated-agent-ab-testing-framework
type: PRD
title: Automated Agent A/B Testing Framework
status: PENDING
owner_persona: epic_planner
created_at: "2026-08-07"
updated_at: "2026-08-07"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-135-automated-agent-ab-testing-framework
tags:
  - foundry
  - orchestrator
  - optimization
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Product Requirements Document: Automated Agent A/B Testing Framework

## Objective
Introduce an Automated Agent A/B Testing Framework within the Foundry Orchestrator to systematically measure and improve prompt performance and persona configurations.

## Scope
1. **Schema Modifications:** Add fields to node YAML frontmatter to support A/B test variant definitions (e.g., `experiment_variants` array or a distinct `EXPERIMENT` node type).
2. **Orchestrator Logic:** Modify `.github/scripts/foundry-orchestrator.ts` to detect nodes with defined variants, clone them into separate DAG paths, and dispatch them to parallel Jules sessions.
3. **Automated Evaluation:** Update the `qa` persona's instructions and potentially introduce a new orchestrator evaluation step to objectively score outputs based on QA acceptance rate, `rejection_count`, and execution time.
4. **Variant Selection & Logging:** Implement logic to select the winning variant automatically, merge its artifacts, and log the results to `.foundry/docs/knowledge_base/prompt-learnings.md`.

## User Stories
- As the agile_coach, I want to define prompt variants in a task so that I can see which prompt yields better code with fewer rework cycles.
- As the orchestrator, I need to clone experiment nodes and manage their parallel execution without causing DAG deadlocks.
- As the QA persona, I want clear instructions on how to evaluate parallel variants and select a winner.

## Technical Requirements
- Ensure parallel variant execution doesn't corrupt the single-owner invariant per node.
- The A/B testing logic should handle edge cases, such as both variants failing permanently.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into Epics (e.g., Schema Updates, Orchestrator Parallelization, QA Evaluation Logic).
