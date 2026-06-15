---
id: task-103-158-gen3-ribbon-bitfields-qa
type: TASK
title: QA Gen 3 Ribbon Bitfields Extraction
status: ACTIVE
owner_persona: qa
created_at: '2026-06-10'
updated_at: '2026-06-15'
depends_on:
  - task-103-157-gen3-ribbon-bitfields-impl
jules_session_id: '16484585539666951600'
pr_number: null
parent: story-064-103-gen3-ribbon-bitfields-extraction
tags:
  - feature
  - gen3
  - contests
  - parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA Gen 3 Ribbon Bitfields Extraction

## 1. Context
This is the QA verification for `task-103-157-gen3-ribbon-bitfields-impl` to extract Gen 3 Ribbon bitfields.

## 2. Requirements
- Validate that the implementation correctly locates the Gen 3 Ribbon bitfields.
- Validate that the data extracted is correct and uses the `DataView` API.
- Validate that tests have been written and pass correctly, and proper error handling is implemented for out of bounds access.
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## 3. Acceptance Criteria
- [ ] Verify test cases cover the various ribbons and block formats.
- [ ] Verify `DataView` API is exclusively used.
- [ ] Verify out-of-bounds read errors are handled gracefully.
