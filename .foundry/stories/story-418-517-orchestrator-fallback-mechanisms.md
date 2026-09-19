---
id: story-418-517-orchestrator-fallback-mechanisms
type: STORY
title: Orchestrator Fallback Mechanisms
status: READY
owner_persona: tech_lead
created_at: '2026-09-02'
updated_at: '2026-09-19'
depends_on:
  - story-418-516-orchestrator-prompt-resolution
jules_session_id: null
pr_number: null
parent: epic-343-418-orchestrator-integration
tags:
  - foundry
  - orchestrator
  - integration
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Fallback Mechanisms

## Description
Ensure the orchestrator gracefully handles scenarios where expected prompt fragments are missing or conflicting. It should log warnings and fallback to sensible defaults without crashing the session dispatch process.

## Acceptance Criteria
- [ ] Implement fallback to a default generic prompt if the base persona prompt is missing.
- [ ] Implement graceful ignoring of missing tag-specific fragments, logging a warning instead of throwing an error.
- [x] Decompose into actionable TASK nodes.
- [ ] task-517-576-orchestrator-fallback-generic-prompt
- [ ] task-517-577-orchestrator-fallback-ignore-tags
