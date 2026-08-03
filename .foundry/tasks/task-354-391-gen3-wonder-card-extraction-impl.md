---
id: task-354-391-gen3-wonder-card-extraction-impl
type: TASK
title: Gen 3 Wonder Card Extraction Implementation
status: PENDING
owner_persona: coder
created_at: '2026-08-02'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-345-354-gen3-wonder-card-extraction
tags:
  - gen3
  - mystery-gift
  - data-extraction
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 3 Wonder Card Extraction Implementation

## Context
This task is to implement the parsing of Wonder Card data from Gen 3 save files. This is the first step in the Mystery Gift data extraction feature.

## Requirements
You must explicitly adhere to the guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`. Specifically:
1.  **Module-Level Constants:** Use module-level constants for memory offsets.
2.  **No Magic Numbers:** Avoid magic numbers.
3.  **Relative Offsets (Gen 3):** Use relative offsets for Gen 3.
4.  **RangeError Handling:** Explicitly catch `RangeError`.

## Acceptance Criteria
- [ ] Coder: Implement Gen 3 Wonder Card Extraction in accordance with Section 13 guidelines.
- [ ] Coder: Write unit tests verifying the extraction logic.

### Suspended Pending Research
- [ ] research-391-393-gen3-wonder-card-offsets
