---
id: story-581-674-orchestrator-resurrection-logic
type: STORY
title: "Update Orchestrator Resurrection Logic"
status: PENDING
owner_persona: tech_lead
created_at: "2026-10-09"
updated_at: "2026-10-09"
depends_on:
  - story-581-673-orchestrator-termination-state-parsing
jules_session_id: null
pr_number: null
parent: epic-586-581-orchestrator-rejection-processing
priority: 80
confidence_score: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Update Orchestrator Resurrection Logic

## Context
Following the parsing of termination states, the Orchestrator's resurrection logic needs to be updated to handle system vs. domain failures differently.

## Objectives
- Update the resurrection loop to not increment `rejection_count` (or use a separate counter) for infrastructure/system crashes (`NOT_FOUND`, `INTERNAL_ERROR`).
- Ensure `MAX_REJECTION_THRESHOLD` correctly applies only to domain/QA rejections.

## Acceptance Criteria
