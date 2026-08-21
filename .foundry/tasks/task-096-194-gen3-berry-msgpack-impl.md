---
id: task-096-194-gen3-berry-msgpack-impl
type: TASK
title: Implement Gen 3 Berry Tracker MsgPack Serialization
status: ACTIVE
owner_persona: coder
created_at: '2026-06-16T00:00:00.000Z'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '16721342954040428922'
pr_number: null
parent: story-055-096-gen3-berry-msgpack-integration
tags:
  - feature
  - gen3
  - berries
  - engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Berry Tracker MsgPack Serialization

## Overview
Implement the MsgPack serialization for Gen 3 berry patch data using `msgpackr` and integrate it with the runtime data API, as defined in the parent story `story-055-096-gen3-berry-msgpack-integration` and governed by ADR 010.

## Context
The parent story specifies that the extracted berry data must be serialized using `msgpackr`, integrated with the PokeData storage generation pipeline, and exposed through the runtime API. Ensure that full, readable property names are used in the application data model as per ADR 015.

## Acceptance Criteria
- [ ] Serialize the extracted berry data using `msgpackr`.
- [ ] Integrate serialized data with PokeData storage generation pipeline.
- [ ] Expose through runtime API.

## Technical Contract Reminders for Coder:
- **Resumption Policy**: If you are resuming a failed node, explicitly read the `rejection_reason` in the frontmatter and the QA/Auditor journal to address previous failures.
- **Permanent Failure**: If you must abort (impossible or max rejections reached), update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Transient Failure**: If you experience a transient failure requiring retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Empty PR**: If you submit an empty PR because the task is already completed, you MUST check off all Acceptance Criteria checkboxes before submitting. Do NOT modify the YAML frontmatter otherwise.
