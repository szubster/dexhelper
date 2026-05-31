---
id: task-064-143-gen3-strategy-qa
type: TASK
title: QA Gen 3 Assistant Strategy Implementation
status: ACTIVE
owner_persona: qa
created_at: '2026-05-23'
updated_at: '2026-05-31'
depends_on:
  - .foundry/tasks/task-064-142-gen3-strategy-impl.md
jules_session_id: '13515931953310014717'
parent: task-064-134-encounter-integration-impl
tags:
  - gen3
  - data
  - msgpack
notes: ''
rejection_reason: ''
---

# QA Gen 3 Assistant Strategy Implementation

## Description
QA validate the integration of Gen 3 encounter data into the suggestion engine and map graph by verifying the Gen 3 Assistant Strategy implementation.

## Acceptance Criteria
- [ ] QA verifies suggestion engine correctly utilizes Gen 3 encounter data via `gen3Strategy`.
- [ ] QA verifies location and encounter routing is aware of Gen 3 specific mechanics.

> **CRITICAL REMINDER TO QA PERSONA**:
> - If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
> - If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
