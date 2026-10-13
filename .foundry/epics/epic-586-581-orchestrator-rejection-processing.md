---
id: epic-586-581-orchestrator-rejection-processing
type: EPIC
title: Implement Phase 3.0 Orchestrator Rejection Processing Logic
status: ACTIVE
owner_persona: story_owner
created_at: '2026-10-08'
updated_at: '2026-10-09'
depends_on: []
jules_session_id: '6737123496821041618'
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
priority: 80
confidence_score: null
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Phase 3.0 Orchestrator Rejection Processing Logic

## Context
When tasks hit the maximum rejection count (`MAX_REJECTION_THRESHOLD = 3`), the Orchestrator auto-cancels them with the generic status message `Max rejection count reached`. Many of these rejections are caused by system-level agent session crashes (`[ACKNOWLEDGED] Session terminated with state: NOT_FOUND`) rather than actual domain/QA rejections. This causes false permanent failures.

This Epic implements Phase 3.0 of Orchestrator Rejection Processing to parse termination states and accurately distinguish between system/infrastructure session crashes and human/agent QA domain rejections.

## Objectives
- Modify the Orchestrator's rejection processing to parse termination states.
- Differentiate between `NOT_FOUND`, `INTERNAL_ERROR`, and domain rejections.
- Update resurrection logic to differentiate handling and limits for system vs. domain failures.

## Acceptance Criteria
- [x] Generate an exclusive STORY dedicated to Integration and E2E Verification.
- [ ] story-581-673-orchestrator-termination-state-parsing
- [ ] story-581-674-orchestrator-resurrection-logic
- [ ] story-581-675-orchestrator-rejection-processing-e2e
