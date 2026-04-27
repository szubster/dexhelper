---
id: "story-009-030-single-persona-dag-tests"
type: "STORY"
title: "Story: Single-Persona DAG Resolution Unit Tests"
status: READY
owner_persona: "tech_lead"
created_at: "2026-04-27"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-009-atomic-handoff-testing.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Story: Single-Persona DAG Resolution Unit Tests

## Overview
Implement unit tests to verify that the orchestrator's DAG resolution logic properly handles strictly single-persona nodes and errors out on multiple personas.

## Acceptance Criteria
- [ ] Unit tests cover single-persona node parsing and resolution without errors.
- [ ] Unit tests verify rejection of nodes with invalid `owner_persona` definitions.
