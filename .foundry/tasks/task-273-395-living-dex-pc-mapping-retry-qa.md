---
id: task-273-395-living-dex-pc-mapping-retry-qa
type: TASK
title: Living Dex PC Mapping Retry Verification
status: READY
owner_persona: qa
created_at: '2026-08-04'
updated_at: '2026-08-15'
depends_on:
  - task-273-394-living-dex-pc-mapping-retry-impl
jules_session_id: null
pr_number: null
parent: story-133-273-living-dex-pc-mapping
tags:
  - living-dex
  - qa
  - data-mapping
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Living Dex PC Mapping Retry Verification

## Context
This QA task verifies the retry implementation of the Living Dex PC Mapping layer (`task-273-394-living-dex-pc-mapping-retry-impl`). Because parsing save file memory and dynamically resolving A/B bank flash memory sections carries significant technical risk, the Intelligent Verification Protocol requires a dedicated QA pass to ensure strict adherence to Gen 3 architecture constraints.

## Acceptance Criteria
- [ ] Verify that data mapping functions correctly extract PC Box and Slot locations for owned Pokémon.
- [ ] Verify that the Coder strictly utilized dynamically resolved section offsets for relative memory offset calculations instead of hardcoded absolute values for Gen 3 parsing.
- [ ] Verify that there are absolutely NO inline magic numbers used for memory offsets, lengths, bit locations, or shifts, and that they are all defined as reusable module-level constants.

## QA Verification Protocol

1. **Review Gen 3 Memory Safety**:
   - Inspect the DataView parsing code. Ensure that `section1Offset` (or similar resolved offsets) is used as the base for calculating the absolute positions in memory.
   - Look for any arbitrary integers like `0x1000` or `1234` passed to DataView getters. If found, reject the implementation immediately.
   - Verify that `RangeError` is properly caught when using the DataView API and thrown as 'The save file is corrupted or incomplete.'

2. **Verify Architecture Constraints**:
   - If React Context layers were scaffolded, verify they correctly decouple shared state from the UI components.
   - If UI components were implemented, verify adherence to the tactical hardware aesthetic (ADR 008): `rounded-none`, `border-dashed`, and `font-mono`.

## Important Reminders for the QA Persona

- **Transient Failures**: If you experience a transient failure requiring retry during your testing, you MUST update the YAML frontmatter of your QA task to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If you must abort or permanently fail a task, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Target Rejections**: If you reject the Coder's implementation, you MUST update the **TARGET task's** YAML frontmatter (`status: FAILED`, increment `rejection_count`, add `rejection_reason`) and do not check its Acceptance Criteria. You MUST NOT modify your own QA task's YAML frontmatter; instead, note the failure in your markdown body and submit an Empty PR.
- **Empty PR Submission**: If you submit an empty PR for a successfully completed QA task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## QA Rejection Notes
Implementation of `task-273-394-living-dex-pc-mapping-retry-impl` has been rejected due to violation of Section 13 ("Save File Parsing & Extraction Guidelines") in `src/engine/saveParser/parsers/gen3.ts`.

Specifically, inline magic numbers were used in `parseGen3PCBoxes`:
- `+ 2`, `+ 4`, `+ 6` for move offset calculations.
- `0xffff` for bit masking decryption keys.
- `16` for right-shifting decryption keys.

All these values must be explicitly defined as reusable constants at the module level.
