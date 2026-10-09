---
id: story-581-673-orchestrator-termination-state-parsing
type: STORY
title: "Parse Orchestrator Termination States"
status: PENDING
owner_persona: tech_lead
created_at: "2026-10-09"
updated_at: "2026-10-09"
depends_on: []
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

# Parse Orchestrator Termination States

## Context
When tasks hit the maximum rejection count (`MAX_REJECTION_THRESHOLD = 3`), the Orchestrator auto-cancels them with the generic status message `Max rejection count reached`. Many of these rejections are caused by system-level agent session crashes (`[ACKNOWLEDGED] Session terminated with state: NOT_FOUND`) rather than actual domain/QA rejections. This causes false permanent failures.

This Story focuses on modifying the Orchestrator's rejection processing to parse termination states and differentiate between `NOT_FOUND`, `INTERNAL_ERROR`, and domain rejections.

## Objectives
- Extract session termination state from crash logs or status updates.
- Differentiate between infrastructure errors (`NOT_FOUND`, `INTERNAL_ERROR`) and actual QA/domain rejections.
- Update tracking to accurately classify failures.

## Acceptance Criteria
