---
id: task-112-165-implement-gen2-hof-parsing
type: TASK
title: Implement Gen 2 Hall of Fame Parsing
status: ACTIVE
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: '16885243995833885890'
pr_number: null
parent: story-070-112-parse-gen2-hof-data
tags:
  - parsing
  - hall-of-fame
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Hall of Fame Parsing

## Context
As part of the social sharing utility expansion, we need to extract the Hall of Fame records from Gen 2 save files (Gold, Silver, Crystal). The core requirement is to parse the Hall of Fame count gracefully.

## Technical Requirements
- **Offset Logic**: The Hall of Fame count in Gen 2 is determined using a relative offset based on the `johtoBadgesOffset`.
  - The `johtoBadgesOffset` is `0x23E5` for Crystal and `0x23E4` for Gold/Silver.
  - The exact offset for the Hall of Fame count is calculated as `johtoBadgesOffset + 0xA8` (168 bytes after).
- **Data Type**: Parse the value at this specific offset as a single 8-bit unsigned integer (`getUint8`).
- **Engine Policy**: Ensure parsing leverages the `DataView` API.

## References
- `.foundry/docs/adrs/adr-044-021-hof-data-parsing-architecture.md`
- `.foundry/docs/knowledge_base/engine/save_parsing/gen2_hall_of_fame.md`

## Acceptance Criteria
- [x] Parsing logic correctly calculates the offset relative to `johtoBadgesOffset`.
- [x] Logic correctly extracts the 8-bit unsigned integer count.
- [x] Unit tests are added to verify the extraction logic specifically for Gen 2.

> **IMPORTANT REMINDER**:
> - If you permanently fail or abort this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
> - If you submit an Empty PR (e.g., target artifacts are already complete), you MUST explicitly check off all Acceptance Criteria checkboxes (`- [x]`) in this markdown file before submitting to satisfy the strict completeness contract (ADR 007).
