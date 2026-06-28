---
id: task-121-172-gen3-tv-block-parser-qa
type: TASK
title: QA Gen 3 TV Block DataView Parser
status: ACTIVE
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-27'
depends_on:
  - task-121-171-gen3-tv-block-parser-impl
jules_session_id: '17296503047468091567'
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

# Task: QA Gen 3 TV Block DataView Parser

## Description
This QA task ensures the completion of the implementation defined in `task-121-171-gen3-tv-block-parser-impl`.
You must verify that the Gen 3 TV broadcast data block parsing logic strictly utilizes the `DataView` API according to **ADR 010**.
You must test that the parsing gracefully handles out-of-bounds reads and malformed files by catching `RangeError` exceptions natively thrown by `DataView`.

## Acceptance Criteria
- [ ] Verified that `DataView` API is used exclusively in the new TV block parsing code.
- [ ] Verified that out-of-bounds reads are successfully caught and mapped to a structured parsing error instead of crashing.
- [ ] Confirmed that backward compatibility with Gen 1 and Gen 2 parsing functions remains unbroken.

## Important Protocols (For QA)
- **Empty PR Protocol:** Once you have manually run tests and verified the code is correct, you MUST submit an empty Pull Request (with 0 file changes). However, before submitting the empty PR, you MUST check off all Acceptance Criteria checkboxes above (`- [x]`).
- **Failure Protocol:** If the implementation failed to meet the ADR requirements or fails testing, you MUST NOT check off the acceptance criteria. Instead, modify the YAML frontmatter to set `status: FAILED` and provide a detailed `rejection_reason`. You must also document the failure in your persona journal.

### Auditor Rejection
**CANCELLED:** This task has been cancelled and replaced by `task-121-218` because its implementation task reached the max rejection count.
