---
id: task-108-162-gen3-roamer-location-qa
type: TASK
title: QA Gen 3 Roamer Location Data Extraction
status: CANCELLED
owner_persona: qa
created_at: '2026-06-11'
updated_at: '2026-06-19'
depends_on:
  - task-108-161-gen3-roamer-location-impl
jules_session_id: null
pr_number: null
parent: story-072-108-gen3-roamer-location-extraction
tags:
  - gen3
  - roamer
  - map
  - qa
research_references:
  - research-071-138-gen3-roamer-offsets
rejection_count: 0
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# QA Gen 3 Roamer Location Data Extraction

## Objective
Verify the implementation of the Gen 3 roamer location data extraction.

## Description
The `coder` persona was tasked with implementing the `DataView` parsing logic to extract the map group and map number for the active Gen 3 roamer from the `.sav` file. Your task is to verify that this implementation is correct, adheres to the established architectural decisions (specifically ADR 010 regarding `DataView` usage), and that the associated tests provide adequate coverage including error handling for corrupted saves.

**CRITICAL INSTRUCTIONS:**
- If the implementation is missing, flawed, or fails tests, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. Do NOT set it to `COMPLETED` manually.
- You must verify the existence of the implementation files before attempting validation.
- If you submit an empty PR because the verification passes without requiring code changes, you MUST check all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Verify that the `DataView` API is used exclusively for the Gen 3 roamer location extraction.
- [ ] Verify that bounds checking is correctly implemented and RangeErrors are gracefully handled.
- [ ] Verify that the provided tests adequately cover the extraction logic and error conditions.

### Auditor Rejection
This QA task is CANCELLED and has been replaced by `task-108-207-gen3-roamer-alternative-impl` and `task-108-208-gen3-roamer-alternative-qa` due to the impossibility of extracting exact location coordinates from the `.sav` file.
