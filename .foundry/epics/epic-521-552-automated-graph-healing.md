---
id: epic-521-552-automated-graph-healing
type: EPIC
title: Epic Automated Graph Healing for BLOCKED Nodes
status: READY
owner_persona: story_owner
created_at: '2026-09-07'
updated_at: '2026-09-11'
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
locks: []
---

# Epic: Automated Graph Healing for BLOCKED Nodes

## Description
Implement an Automated Graph Healing sub-routine to resolve `BLOCKED` node states in the Foundry DAG Orchestrator caused by circular dependencies or unresolvable node paths. This involves updating the orchestrator to output a BLOCKED Diagnosis artifact, creating a GitHub Action to trigger a `graph_healer` (or `mechanic`) agent, defining the agent's persona prompt, and adding comprehensive unit and E2E tests for the healing process.

## Acceptance Criteria
- [x] Break down this Epic into Stories.
- [x] Ensure a final STORY dedicated exclusively to Integration and E2E Verification is generated.
- [ ] story-552-566-orchestrator-diagnosis-artifact
- [ ] story-552-567-graph-healer-action-persona
- [ ] story-552-568-graph-healing-e2e-verification
