---
id: task-103-157-gen3-ribbon-bitfields-impl
type: TASK
title: Implement Gen 3 Ribbon Bitfields Extraction
status: ACTIVE
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-15'
depends_on:
  - research-103-157-gen3-ribbon-offsets
jules_session_id: '18064639764475352905'
pr_number: null
parent: story-064-103-gen3-ribbon-bitfields-extraction
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Ribbon Bitfields Extraction

## 1. Context
As part of the Gen 3 contest data extraction (Story `story-064-103-gen3-ribbon-bitfields-extraction`), we need to extract the bitfields representing Contest Ribbons directly from Gen 3 save files. The parser must use the native `DataView` API.

## 2. Requirements
- Locate the appropriate blocks and offsets for the ribbon bitfields within Gen 3 save formats (e.g. Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- Implement a parser that uses exclusively the `DataView` API (e.g., `getUint32`) to read these bitfields, as mandated by ADR 010.
- Ensure the data structure exposes the individual ribbons cleanly.
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Locate blocks and offsets for the Ribbon bitfields.
- [ ] Extract the bitfields and expose the structured data.
- [ ] Ensure `DataView` API is used exclusively for reading the bitfields.
- [ ] Include error handling for out-of-bounds access.
