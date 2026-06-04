---
id: research-081-006-investigate-enum-optimizations-failure
type: RESEARCH
title: Investigate Enum Optimizations Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-05-29'
updated_at: '2026-06-01'
depends_on: []
jules_session_id: '282312166394939533'
parent: story-042-081-preserve-enum-optimizations
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Enum Optimizations Failure

## Objective
Investigate why `task-081-130-preserve-enum-optimizations-impl` failed permanently with the reason "Merged with unfulfilled acceptance criteria". Determine the root cause of why the enum-to-number mapping logic (like `EVO_TRIGGER`, `ENCOUNTER_METHOD`) in `scripts/generate-pokedata.ts` was not properly preserved or verified.

## Output
Update this document with the root cause analysis and any findings that should be applied to the replacement implementation task. Check the boxes when done.

## Acceptance Criteria
- [x] Root cause of the failure is identified.
- [x] Recommendations for the replacement implementation task are documented.

## Root Cause Analysis
The prerequisite task `task-080-132-refactor-generation-exports-impl.md` (which was supposed to rename all short keys to verbose keys in `schema.ts` and `generate-pokedata.ts`) was incorrectly closed as an Empty PR by the Tech Lead. Consequently, the codebase still uses the short keys (`m`, `tr`, `n`, etc.). When the coder for `task-081-130` attempted to "preserve" the enum mappings for the verbose keys, they found no verbose keys to work with. They likely submitted an Empty PR without checking off the Acceptance Criteria, leading the Orchestrator/Heartbeat to reject it with "Merged with unfulfilled acceptance criteria" per ADR 009.

## Recommendations
The replacement implementation task (`task-081-144`) MUST actually perform the full refactor to verbose keys (e.g., renaming `m` to `method`, `tr` to `trigger`, `n` to `name`, etc. as outlined in ADR 015) in both `src/db/schema.ts` and `scripts/generate-pokedata.ts`, because the previous task (`task-080-132`) failed to do so. While doing this rename, it must explicitly preserve the enum-to-number optimizations for fields like `method` (using `ENCOUNTER_METHOD_MAP`) and `trigger` (using `EVO_TRIGGER_MAP`).
