---
id: task-562-596-gen3-missed-items-extraction-qa
type: TASK
title: Gen 3 Missed Items Extraction QA
status: PENDING
owner_persona: qa
created_at: '2026-09-19'
updated_at: '2026-09-19'
depends_on:
  - task-562-595-gen3-missed-items-extraction-tests
jules_session_id: null
pr_number: null
parent: story-553-562-gen3-missed-items-parsing
tags:
  - dexhelper
  - gen3
research_references: []
locks: []
---

# Task: Gen 3 Missed Items Extraction QA

## Description
Perform Quality Assurance on the Gen 3 missed items extraction logic implemented in `task-562-594-gen3-missed-items-extraction-logic` and its corresponding tests in `task-562-595-gen3-missed-items-extraction-tests`.

## Acceptance Criteria
- [ ] Verify that the extraction logic strictly adheres to the guidelines in Section 13 of `.foundry/docs/schema.md`.
- [ ] Confirm all memory offsets and bit locations are defined as reusable module-level constants (no magic numbers).
- [ ] Confirm that relative offsets using section offsets are used instead of absolute hardcoded offsets.
- [ ] Confirm `RangeError` catching and the specific error messaging is implemented correctly.
- [ ] Verify unit tests are passing and correctly test the implementation.