---
id: task-109-225-gen3-roamer-status-parsing-qa
type: TASK
title: QA Gen 3 Roamer Status Condition Parsing
status: PENDING
owner_persona: qa
created_at: '2026-06-27'
updated_at: '2026-06-27'
depends_on:
  - task-109-224-gen3-roamer-status-parsing-impl
jules_session_id: null
pr_number: null
parent: story-070-109-gen3-roamer-status-parsing
tags:
  - gen3
  - roamer
  - qa
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# QA Gen 3 Roamer Status Condition Parsing

## Objective
Verify the implementation logic for parsing the Status Condition from the Gen 3 roamer data structure.

## Description
The `coder` persona was tasked with implementing the extraction of the Gen 3 roamer status condition using the `DataView` API, avoiding magic numbers by defining constants. Your task is to verify that this implementation works correctly.

**CRITICAL INSTRUCTIONS:**
- If the implementation is missing, flawed, or fails tests, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`. Do NOT set it to `COMPLETED` manually.
- You must verify the existence of the implementation files before attempting validation.
- If you submit an empty PR because the verification passes without requiring code changes, you MUST check all Acceptance Criteria checkboxes before doing so.

## Acceptance Criteria
- [ ] Verify that the status condition is correctly extracted from the 20-byte roamer structure.
- [ ] Verify that all memory offsets, lengths, bit locations, and shifts are defined as reusable constants at the module level (no inline magic numbers).
- [ ] Verify that the provided tests adequately cover the logic and correctly handle edge cases.