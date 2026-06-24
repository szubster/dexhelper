---
id: task-108-213-gen3-roamer-dataview-extraction-qa
type: TASK
title: QA Gen 3 Roamer DataView Extraction
status: CANCELLED
owner_persona: qa
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on: []jules_session_id: null
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: 'Redundant task, implementation was already completed in task-108-161'
notes: ''
---

# QA Gen 3 Roamer DataView Extraction

## Objective
Verify the implementation of the Gen 3 Roamer DataView extraction logic.

## Description
This QA task ensures that the extraction logic implemented in `task-108-212-gen3-roamer-dataview-extraction-impl` strictly adheres to architectural decisions and parses the data correctly.

The primary concerns are validating the use of the `DataView` API over raw `Uint8Array` manipulations (ADR 010), verifying that all magic numbers are abstracted into module-level constants, and ensuring the mathematical correctness of the bitwise operations used to extract the IVs.

## Acceptance Criteria
- [ ] Review the codebase to ensure `DataView` API is used exclusively for reading the roamer data structure.
- [ ] Verify all memory offsets, lengths, and bitwise shifts are defined as module-level constants (no inline magic numbers).
- [ ] Validate the mathematical correctness of the IV bitwise extraction logic (matching Gen 3 specifications).
- [ ] Ensure unit tests have adequate coverage for boundary cases (e.g., all 0 IVs, all 31 IVs).
- [ ] **QA Mandate:** If experiencing a transient failure requiring a retry, update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- [ ] **QA Mandate:** If the task must be permanently aborted, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- [ ] **QA Mandate:** If submitting an empty PR for a completed task, check off all Acceptance Criteria checkboxes before submitting.

### Auditor Rejection
This task is permanently cancelled as it is redundant. The extraction logic was already fully implemented and verified in task-108-161.
