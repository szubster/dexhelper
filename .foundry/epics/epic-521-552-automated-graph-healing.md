---
id: epic-521-552-automated-graph-healing
type: EPIC
title: Epic Automated Graph Healing for BLOCKED Nodes
status: PENDING
owner_persona: story_owner
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-156-521-automated-graph-healing
tags:
  - foundry
  - orchestrator
  - dag
  - self-healing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Automated Graph Healing for BLOCKED Nodes

## Description
Implement an Automated Graph Healing sub-routine to resolve `BLOCKED` node states in the Foundry DAG Orchestrator caused by circular dependencies or unresolvable node paths. This involves updating the orchestrator to output a BLOCKED Diagnosis artifact, creating a GitHub Action to trigger a `graph_healer` (or `mechanic`) agent, defining the agent's persona prompt, and adding comprehensive unit and E2E tests for the healing process.

## Acceptance Criteria
- [ ] Break down this Epic into Stories.
- [ ] Ensure a final STORY dedicated exclusively to Integration and E2E Verification is generated.
