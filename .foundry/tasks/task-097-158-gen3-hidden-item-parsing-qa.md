---
id: task-097-158-gen3-hidden-item-parsing-qa
type: TASK
title: Gen 3 Hidden Item Event Flags Parsing QA
status: PENDING
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - task-097-157-gen3-hidden-item-parsing-impl
jules_session_id: null
pr_number: null
parent: story-058-097-gen3-hidden-item-parsing
tags:
  - gen3
  - save-parsing
  - feature
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Hidden Item Event Flags Parsing QA

## Context
This QA task verifies the coder's implementation for Gen 3 hidden item parsing (`task-097-157-gen3-hidden-item-parsing-impl`). The goal is to ensure the save parsing engine correctly extracts hidden item event flags for Gen 3 games while strictly adhering to ADR 010.

## QA Verification Steps
1. **Verify ADR 010 Compliance**: Review `src/engine/saveParser/parsers/gen3.ts`. Ensure the parsing logic *exclusively* uses the native `DataView` API (e.g., `getUint8`, `getUint16`, `getUint32`) and avoids raw `Uint8Array` access.
2. **Verify Error Handling**: Confirm that `RangeError` exceptions thrown by out-of-bounds `DataView` accesses are properly caught and handled gracefully (e.g., re-thrown as specific validation errors like "Corrupted Save File").
3. **Verify Extraction Logic**: Ensure that the code correctly navigates the Gen 3 4KB section structure to locate the event flags and extract the proper sub-section for hidden items.
4. **Verify Test Coverage**: Check the Gen 3 save parser unit tests. They must provide adequate mock data reflecting the Gen 3 save format and assert that `hiddenItemFlags` are extracted properly with the correct byte values. Tests must pass successfully.

## Acceptance Criteria
- [ ] Code strictly adheres to ADR 010 (`DataView` API usage).
- [ ] Out-of-bounds `DataView` accesses are handled gracefully.
- [ ] Gen 3 section parsing logic accurately targets and extracts the hidden item flags.
- [ ] Unit tests for Gen 3 hidden item parsing exist, provide sufficient coverage, and pass.

## IMPORTANT REMINDERS
- **If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.**
- **If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.**
