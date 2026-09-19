---
id: prd-521-565-agent-confidence-metrics-dashboard
type: PRD
title: PRD for Agent Confidence Metrics Dashboard
status: PENDING
owner_persona: epic_planner
created_at: '2026-09-14'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-521-agent-confidence-metrics-dashboard
tags:
  - foundry
  - orchestrator
  - metrics
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 60
---

# PRD: Agent Confidence Metrics Dashboard

## Overview
Based on IDEA-521, this PRD defines the requirements for implementing an Agent Confidence Metrics Dashboard. The goal is to provide a real-time understanding of agent confidence during execution by allowing agents to self-report a 'confidence_score' (0-100) or 'risk_level' in the YAML frontmatter of Foundry nodes.

## Objectives
- Allow agents (specifically `coder` and `qa`) to output and self-report their confidence scores during task execution.
- Integrate the confidence score into the orchestrator to trigger proactive interventions (e.g. spawn mandatory QA or Auditor reviews if confidence < 70).
- Extend the DAG visualization or create a new metrics view to highlight nodes with low confidence scores for human or TPM review.

## Functional Requirements
1. **Node Schema Updates:**
   - Add `confidence_score` (integer, 0-100) to the schema.md definition for task nodes.
2. **Agent Capability:**
   - Define a mechanism (prompt instruction or tool update) that instructs agents on how and when to report `confidence_score`.
3. **Orchestrator Integration:**
   - Modify the orchestrator logic so that when a node is marked `COMPLETED`, if `confidence_score < 70`, it overrides the standard transition and spawns a `QA` or `Auditor` task.
4. **Dashboard View:**
   - Update the UI dashboard to expose the confidence scores visually, color-coding low-confidence nodes (e.g. red for <70, yellow for 70-89, green for 90+).

## Acceptance Criteria
- [x] Break down into Epics
- [ ] epic-565-569-agent-confidence-metrics-schema
- [ ] epic-565-570-agent-confidence-metrics-orchestrator
- [ ] epic-565-571-agent-confidence-metrics-dashboard-ui
- [ ] epic-565-572-agent-confidence-metrics-agent-capability
- [ ] epic-565-573-agent-confidence-metrics-e2e
