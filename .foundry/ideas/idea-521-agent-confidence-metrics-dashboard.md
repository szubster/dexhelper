---
id: idea-521-agent-confidence-metrics-dashboard
type: IDEA
title: Agent Confidence Metrics Dashboard
status: PENDING
owner_persona: product_manager
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - metrics
research_references: []
rejection_count: 0
rejection_reason: ''
locks: []
---

# Idea: Agent Confidence Metrics Dashboard

## Context
Currently, the Foundry orchestrator uses a binary status model (e.g., ACTIVE, READY, FAILED, COMPLETED) to track node progression. If an agent struggles or frequently triggers the Resurrection Loop, we only find out after a failure occurs or by manually inspecting rejection counts. We lack a real-time understanding of how confident agents are while they are actively working or transitioning nodes.

## Proposal
Introduce a "Confidence Score" (e.g., 0-100) or a "Risk Level" field within the YAML frontmatter of Foundry nodes that agents can self-report during their execution, alongside a visual dashboard to track it.

1. **Self-Reporting:** Allow agents (especially `coder` and `qa`) to update their node's `confidence_score` during execution or before submitting an Empty PR. If an agent is uncertain about a complex implementation (e.g., bitwise extraction) but technically completed it, they can report a lower score.
2. **Orchestrator Integration:** The orchestrator can use this score to trigger proactive interventions. For instance, if a node is marked `COMPLETED` but has a `confidence_score < 70`, the orchestrator could automatically spawn a mandatory `QA` or `Auditor` task to deeply review the work, rather than just blindly accepting the Empty PR.
3. **Visual Dashboard:** Enhance the existing DAG visualizer (or create a new metrics view) to highlight nodes with low confidence scores in real-time, allowing the human "CEO" or the `tpm` to focus manual reviews on high-risk areas.

## Value Proposition
- Provides proactive visibility into struggling tasks before they merge or fail permanently.
- Optimizes the QA process by dynamically routing high-risk tasks for stricter automated or human review.
- Gives agents a formalized way to signal uncertainty without having to fail a task or wait for a CEO rejection.
