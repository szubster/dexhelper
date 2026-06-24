---
id: task-102-157-impl-gen3-sheen-parsing
type: TASK
title: Implement Gen 3 Sheen Value Parsing
status: COMPLETED
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-064-102-gen3-sheen-value-parsing
tags:
  - feature
  - gen3
  - contests
  - parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: Implement Gen 3 Sheen Value Parsing

## 1. Context
As part of `story-064-102-gen3-sheen-value-parsing`, we need to implement logic to extract the Sheen value from Gen 3 save files.

## 2. Requirements
- Locate the correct block and offset for the Sheen value in Gen 3 saves.
- Implement the extraction logic in `src/engine/saveParser/parsers/gen3.ts`.
- **Strict DataView API Usage**: All parsing logic for contest data MUST exclusively use the native `DataView` API (e.g., `getUint8`) as mandated by ADR 010.

## 3. Acceptance Criteria
- [x] Implement Sheen value extraction logic using the `DataView` API.
- [x] Ensure unit tests are added or updated to verify the extracted Sheen value.
- [x] **Important:** If you abort or permanently fail this task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- [x] **Important:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
