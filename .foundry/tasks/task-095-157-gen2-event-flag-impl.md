---
id: task-095-157-gen2-event-flag-impl
type: TASK
title: Gen 2 Event Flag Extraction - Implementation
depends_on:
  - research-task-095-157-gen2-event-flag-offsets
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '12729977573204018786'
pr_number: null
parent: story-061-095-gen2-event-flag-extraction
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: 'Exact Gen 2 event flag offsets are not documented. Spawned a RESEARCH node to investigate.'
notes: ''
---

# Task: Gen 2 Event Flag Extraction - Implementation

## Blueprint
As requested in Story `story-061-095-gen2-event-flag-extraction`, you are to implement a parser for Gen 2 save files to extract specific time-gated event flags.

### Architecture Directives
1. **DataView API:** Per ADR 010 and `.foundry/docs/knowledge_base/engine/save_parser/dataview_migration.md`, all new parsing logic MUST exclusively use the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`). DO NOT use raw `Uint8Array` manipulations.
2. **Bounds Checking:** Rely on `DataView` to throw `RangeError` on out-of-bounds reads. Ensure the parser engine catches these errors explicitly and handles them gracefully, propagating them as specific validation errors (e.g., "Corrupted Save File").
3. **Empty PR Policy & Acceptance Criteria Checkboxes:** If you find the artifacts are already implemented, you MUST submit an Empty PR. However, before submitting the Empty PR, you MUST check all Acceptance Criteria checkboxes. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009.
4. **Permanent Failure Policy (ADR 017):** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a specific `rejection_reason`.

## Acceptance Criteria
- [ ] Implement Gen 2 event flag extraction logic using the `DataView` API.
- [ ] Add unit tests demonstrating successful extraction and bounds checking (`RangeError` scenarios).
