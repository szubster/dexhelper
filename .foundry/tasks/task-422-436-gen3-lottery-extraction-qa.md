---
id: task-422-436-gen3-lottery-extraction-qa
type: TASK
title: Gen3 Lottery Data Extraction QA
status: READY
owner_persona: qa
created_at: '2026-08-17'
updated_at: '2026-08-20'
depends_on:
  - task-422-435-gen3-lottery-extraction-impl
jules_session_id: null
pr_number: null
parent: story-133-422-gen3-lottery-data-extraction
tags:
  - feature
  - gen3
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen3 Lottery Data Extraction QA

## Goal
Verify the implementation of Gen 3 lottery data extraction.

## Requirements
- Verify that the implementation uses the correct memory offsets for Emerald, Ruby, and Sapphire as per `.foundry/docs/knowledge_base/gen3_lottery_offsets.md`.
- Verify that `DataView` API is used and `RangeError` is handled.

## Acceptance Criteria
- [x] Verify implementation correctly extracts lottery data.
- [x] Verify tests pass.
