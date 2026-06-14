---
id: task-123-184-gen3-active-swarm-parsing-qa
type: TASK
title: QA Gen 3 Active Swarm Parsing
status: PENDING
owner_persona: qa
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on:
  - task-123-183-gen3-active-swarm-parsing-impl
jules_session_id: null
pr_number: null
parent: story-081-123-gen3-active-swarm-parsing
tags:
  - feature
  - gen3
  - data-parsing
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Gen 3 Active Swarm Parsing

## Description
This task requires you to test and verify the newly implemented logic for extracting the active swarm data from Gen 3 save files. The implementation must correctly extract the active swarm data (species, location, and remaining days).
Furthermore, you must ensure that the implementation strictly utilizes the `DataView` API and properly catches native `RangeError` exceptions for out-of-bounds reads on corrupted data, as mandated by ADR 010.

## Acceptance Criteria
- [ ] Write tests or perform manual QA verification to confirm active swarm data (species, location, remaining days) is parsed correctly.
- [ ] Verify that `RangeError` exceptions thrown by out-of-bounds `DataView` access are gracefully caught and handled.

## Important Protocols (For QA)
- **Failure Protocol:** If the implementation is fundamentally flawed, un-testable, or fails to satisfy ADR 010 constraints, you MUST NOT check off the acceptance criteria. Instead, modify the YAML frontmatter to set `status: FAILED` and provide a clear `rejection_reason`. You must also document the failure in your persona journal.
- **Empty PR Protocol:** When you are satisfied with the quality and all checks pass, if no test code modifications were necessary, you MUST submit an empty PR. Ensure you check off all the checkboxes (`- [x]`) before doing so.
