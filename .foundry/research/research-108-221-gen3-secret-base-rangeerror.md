---
id: research-108-221-gen3-secret-base-rangeerror
type: RESEARCH
title: Investigate RangeError Handling in Gen 3 Secret Base Parser
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-24'
updated_at: '2026-06-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-108-parse-secret-base-locations
tags:
  - research
  - gen3
  - secret-base
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate RangeError Handling in Gen 3 Secret Base Parser

## Context
The previous implementation for Gen 3 Secret Base parsing (`task-108-163-gen3-secret-base-parser`) failed permanently because it violated ADR 010. While it used the `DataView` API, it failed to explicitly catch and handle `RangeError` from out-of-bounds reads.

## Findings
- **ADR 010 Requirement:** All new Gen3 save parsing logic MUST exclusively use the native `DataView` API. Crucially, the parser must rely on `DataView` to throw `RangeError` on out-of-bounds reads, which must be caught explicitly by the parser engine, and gracefully propagated up as specific validation errors (e.g., "Corrupted Save File"), rather than crashing the application or returning malformed data.
- **Root Cause of Previous Failure:** The coder implemented `DataView` reading (e.g., `dataView.getUint8(offset)`) but did not wrap the parsing block in a `try...catch (e)` block that specifically checks for `e instanceof RangeError` and throws a controlled `CorruptedSaveFileError` or similar safe fallback.
- **Architectural Constraint for Retries:** In addition to fixing the `RangeError` logic, a new constraint from the Tech Lead Journal must be enforced: "When drafting blueprints for save file parsing, explicitly require that all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers."

## Resolution
New replacement tasks will be generated that explicitly mandate both the `try...catch` block for `RangeError` when using `DataView`, and the definition of all magic numbers as reusable module-level constants.
