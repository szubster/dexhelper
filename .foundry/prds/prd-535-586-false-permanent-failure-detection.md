---
id: prd-535-586-false-permanent-failure-detection
type: PRD
title: False Permanent Failure Detection & Distinction in Orchestrator
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-10-04'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: '4788999238856628233'
pr_number: null
parent: idea-535-false-permanent-failure-detection
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# PRD: False Permanent Failure Detection & Distinction in Orchestrator

## Overview
When tasks hit the maximum rejection count (`MAX_REJECTION_THRESHOLD = 3`), the Orchestrator auto-cancels them with the generic status message `Max rejection count reached`. However, many of these rejections are caused by system-level agent session crashes (`[ACKNOWLEDGED] Session terminated with state: NOT_FOUND`) rather than actual domain/QA rejections. This causes false permanent failures, obscuring the true root cause and unnecessarily cancelling tasks that were otherwise sound. This PRD details the modifications required to correctly classify and track failure types to prevent false positives and unnecessary DAG deadlocks.

## Objectives
1. **Differentiate Failures**: Accurately distinguish between system/infrastructure session crashes (e.g., `NOT_FOUND`, `INTERNAL_ERROR`) and human/agent QA domain rejections.
2. **Isolate Tracking**: Track infrastructure failures independently from QA domain rejections, preventing temporary system issues from falsely exceeding the domain rejection limit and cancelling tasks.
3. **Explicit Visibility**: Provide distinct rejection reasons and statuses in the Foundry DAG to aid in immediate and accurate root-cause analysis by Parent nodes and Researchers.

## Scope
- Modify the Orchestrator's rejection processing (Phase 3.0) to parse termination states (`NOT_FOUND`, `INTERNAL_ERROR`, etc.) from session transcripts/commit logs.
- Update the `.foundry` YAML frontmatter schema to include a dedicated tracker for system failures (e.g., `system_failure_count`).
- Update resurrection logic to differentiate handling and limits for system vs. domain failures.
- Update Telemetry tools and metrics dashboards to display and distinguish these two failure types.

## Acceptance Criteria
- [ ] Define the technical architecture for the new failure tracking (ADR).
- [ ] Breakdown Epic to implement the phase 3.0 Orchestrator rejection processing logic.
- [ ] Breakdown Epic to update the schema and validation logic for new YAML counters.
- [ ] Breakdown Epic to update telemetry scripts and dashboards.
