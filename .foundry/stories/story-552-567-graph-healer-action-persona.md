---
id: story-552-567-graph-healer-action-persona
type: STORY
title: Create Graph Healer Agent Persona and Action
status: READY
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on:
  - story-552-566-orchestrator-diagnosis-artifact
jules_session_id: null
pr_number: null
parent: epic-521-552-automated-graph-healing
tags:
  - foundry
  - agents
  - github-actions
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Create Graph Healer Agent Persona and Action

## Description
Define the `graph_healer` (or `mechanic`) agent persona prompt that can interpret the BLOCKED Diagnosis artifact and propose resolutions (e.g., breaking cycles, updating dependencies). Implement a GitHub Action workflow to automatically trigger this agent whenever the orchestrator outputs a diagnosis artifact.

## Acceptance Criteria
- [ ] Break down this Story into Tasks.
