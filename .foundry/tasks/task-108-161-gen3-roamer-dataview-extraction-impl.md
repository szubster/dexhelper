---
id: task-108-161-gen3-roamer-dataview-extraction-impl
type: TASK
title: Implement Gen 3 Roamer DataView Extraction and Core Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-18'
depends_on:
  - research-108-163-gen3-roamer-iv-bitfield
  - research-161-186-gen3-roamer-iv-bitfield
  - research-161-188-gen3-roamer-iv-bitfield-formula
jules_session_id: '11679163152443792366'
pr_number: null
parent: story-070-108-gen3-roamer-dataview-extraction
tags:
  - gen3
  - roamer
  - save-parsing
research_references: []
rejection_count: 3
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Roamer DataView Extraction and Core Parsing

## Objective
Implement the logic to extract the 20-byte hidden roamer data structure from Gen 3 save files using the `DataView` API, and accurately parse the IVs, HP, and Level.

## Description
Following ADR 010, the base extraction logic in the save parser for Gen 3 must safely read the 20-byte roamer structure exclusively using the `DataView` API. After extraction, correctly parse the IVs, HP, and Level of the roamer from this raw byte structure. Ensure that any out-of-bounds reads result in a `RangeError` that is caught and handled gracefully by propagating a validation error (e.g., "Corrupted Save File").

## Acceptance Criteria
- [ ] Read the 20-byte Gen 3 roamer structure strictly using the `DataView` API.
- [ ] Parse IVs, HP, and Level correctly from the extracted structure.
- [ ] Handle `RangeError` on out-of-bounds reads gracefully and throw a clear validation error.
- [ ] Tests and lint must pass.

**Important Instructions:**
If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

- [ ] .foundry/research/research-161-186-gen3-roamer-iv-bitfield.md
