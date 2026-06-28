---
id: task-123-183-gen3-active-swarm-parsing-impl
type: TASK
title: Implement Gen 3 Active Swarm Parsing
status: READY
owner_persona: coder
created_at: '2026-06-14'
updated_at: '2026-06-28'
depends_on:
  - research-123-202-gen3-outbreak-offsets
jules_session_id: null
pr_number: null
parent: story-081-123-gen3-active-swarm-parsing
tags:
  - feature
  - gen3
  - data-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement Gen 3 Active Swarm Parsing

## Description
This task requires you to implement the logic to extract the active swarm data from the Gen 3 save file structure, including the specific Pokémon species, map location, and the days remaining.
As mandated by **ADR 010**, you MUST strictly utilize the `DataView` API for all new Gen 3 data parsing logic to ensure robustness and safety.
You must avoid legacy `Uint8Array` manual read methods and instead use `DataView` methods such as `getUint8`, `getUint16`, etc., to enforce native bounds checking.

Any out-of-bounds reads or structurally corrupt states MUST trigger a gracefully caught `RangeError` which the parser translates into a descriptive structural error, rather than crashing the application.

## Acceptance Criteria
- [ ] Implement extraction of active swarm data (species, location) entirely using `DataView`.
- [ ] Implement extraction of the remaining days for the active swarm using `DataView`.
- [ ] Explicit error handling is in place to catch `RangeError` exceptions natively thrown by `DataView` on malformed saves.

## Important Protocols (For Coder)
- **Empty PR Protocol:** If the required logic is already implemented and the criteria are satisfied by existing code, you MUST still submit an empty Pull Request (with 0 file changes). However, before submitting an empty PR, you MUST check off all Acceptance Criteria checkboxes above (`- [x]`).
- **Failure Protocol:** If you encounter a deadlock or a fundamental impossibility to complete this task, you MUST NOT check off the acceptance criteria. Instead, modify the YAML frontmatter to set `status: FAILED` and provide a clear `rejection_reason`. You must also document the failure in your persona journal.
