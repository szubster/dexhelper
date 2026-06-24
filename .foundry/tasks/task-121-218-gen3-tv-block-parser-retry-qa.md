---
id: task-121-218-gen3-tv-block-parser-retry-qa
type: TASK
title: QA Gen 3 TV Block DataView Parser (Retry)
status: PENDING
owner_persona: qa
created_at: '2026-06-23'
updated_at: '2026-06-23'
depends_on: []jules_session_id: null
pr_number: null
parent: story-081-121-gen3-tv-block-dataview-parser
tags:
  - qa
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 TV Block DataView Parser (Retry)

## Description
This QA task ensures the completion of the implementation defined in `task-121-217-gen3-tv-block-parser-retry-impl`.
You must verify that the Gen 3 TV broadcast data block parsing logic strictly utilizes the `DataView` API according to **ADR 010**.
You must test that the parsing gracefully handles out-of-bounds reads and malformed files by catching `RangeError` exceptions natively thrown by `DataView`.

## Acceptance Criteria
- [ ] Verified that `DataView` API is used exclusively in the new TV block parsing code.
- [ ] Verified that out-of-bounds reads are successfully caught and mapped to a structured parsing error instead of crashing.
- [ ] Confirmed that backward compatibility with Gen 1 and Gen 2 parsing functions remains unbroken.

### Auditor Rejection
**CANCELLED:** This task has been cancelled and replaced by `task-121-220-gen3-tv-block-parser-retry-qa` because its dependencies changed after investigating a permanent failure.
