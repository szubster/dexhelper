# QA Session 10610034023932477089

- Ensured `### SCHEMA` link at the bottom of markdown was preserved to avoid rejection during plan review by explicitly reading the bottom 500 characters using `tail -c 500`.
- Verified file write modifications and test stability to satisfy completeness rules before submittal.

## Entry from 11361217312313065104.md

- Verified Gen 3 IV/PV Extraction implementation met all acceptance criteria, tests are passing, no regressions found.

## Learnings
- **Recurring Issue:** Coders frequently violate Section 13 (No Magic Numbers) of `.foundry/docs/schema.md` when parsing Gen 3 Secret Base data.
- **Specific Instance:** In `task-404-408-gen3-secret-base-parser-impl`, the implementation hardcoded `0` to check for empty secret bases (`if (secretBaseId === 0)`) and in the bitwise flag check (`(flags & BATTLED_OWNER_TODAY_MASK) !== 0`), instead of defining and using module-level constants for these values.
- **Action Required:** Ensure coders are explicitly reminded of Section 13 constraints, particularly regarding implicit/magic numbers like `0` in conditional statements.

## Entry from 14509821843729640775.md

The task was already implemented. Checked the markdown boxes and submitted an empty PR.

## From YYYY-MM-DD-HH-MM-SS.md

Session YYYY-MM-DD-HH-MM-SS: Verified the E2E test for the Epic Planner process changes is effectively tested by Vitest inside .github/scripts/foundry-orchestrator.test.ts, satisfying the acceptance criteria.

## From 16585296348294548606.md

Session 16585296348294548606: Verified task-401-410-gen2-dv-extraction-qa. Submitted empty PR satisfying ADR 007 checkboxes. If Vitest or a similar test command fails with a 'JavaScript heap out of memory' error, increase the Node.js memory allocation by prepending NODE_OPTIONS="--max-old-space-size=4096" to your test command.

# QA Journal Entry
Tested the QA e2e verification task for orphaned QA rule removal.
Checked off the acceptance criteria box as the rule verification is implemented successfully.

# QA Session - 2026-08-11-21-55-58

- Task `task-359-416-gen3-roamer-unit-tests-qa` was correctly implemented.
- Unit tests for Emerald, Ruby/Sapphire, and FireRed/LeafGreen `Roamer` struct parsing exist and cover IVs, Personality Value, Species, HP, Level, Status, and Active boolean using DataView mocks.
- Verified testing suites passing without error.
- Task criteria successfully signed off.

## Verified Task
task-408-418-schema-role-mapping-qa

## Learnings & Observations
- The `test_list.sh` scratchpad file must be removed before PR creation.
- Checked off the Markdown box for the empty PR rule safely without modifying YAML frontmatter.


---

# QA Session 8427761960184787152

Verified the implementation of the Gen 3 Static Encounters UI (`task-295-408-gen3-static-encounters-ui-qa-retry`).
The `Gen3StaticEncountersDashboard` is correctly displayed on the main Gen 3 dashboard (`src/routes/dashboard.tsx`).
The UI correctly displays the static encounter checklist based on save file flags as verified by the Vitest unit tests in `src/components/dashboard/encounters/__tests__/Gen3StaticEncountersDashboard.test.tsx`.
Checked off the acceptance criteria in the task markdown file.

<!-- Source: 5152784191889048494.md -->
# QA Journal Entry

## Context
QA Verification for Item Data Runtime Integration (Task `task-280-306-item-runtime-qa`).

## Findings
- Successfully verified that the codebase's test suite passed, implying that the IndexedDB modifications and removal of hardcoded tables functioned correctly under test conditions.
- Adhered to the `Empty PR Checkbox Policy` by checking off acceptance criteria for a completed target artifact and submitting a passthrough PR without modifying the task's YAML frontmatter.
- Discovered that running background tasks like `xvfb-run pnpm test:e2e &` requires careful monitoring of output streams (`tail e2e_output.log`) and potentially process management since Xvfb might fail to start if another instance is already running (requiring `killall Xvfb`).
- When proposing execution plans for Empty PRs, the plan must include exactly the core verification commands (`pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e`) without extra unmentioned commands, and the plan steps must be strictly un-nested forward-looking actions.


<!-- Source: 2026-08-12-19-05-51.md -->
# QA Rejection: Gen 3 Safari Zone State Parsing Implementation

**Session ID**: 2026-08-12-19-05-51
**Target Task**: `task-340-341-gen3-safari-zone-state-impl`
**Status**: Rejected (FAILED)

## Architectural Violations
The implementation for `task-340-341-gen3-safari-zone-state-impl` was rejected due to several violations of the architectural guidelines and contracts established for the codebase.

1. **Inline Magic Numbers**:
   - `parseGen3PCBuffer`: Hardcoded length values `2000` and `3968` instead of using module-level constants.
   - `parseGen3PCBoxes`: Hardcoded level value `1` and hardcoded offset addition `2`, `4`, `6` for moves instead of module-level constants.
   - All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level (ADR 028).

2. **Swallowed Exceptions (RangeError)**:
   - `parseGen3PCBuffer`: Did not wrap the `DataView` read inside a `try...catch` block to handle `RangeError`.
   - Out-of-bounds `DataView` reads that throw `RangeError` must be explicitly caught and re-thrown with the exact message: "The save file is corrupted or incomplete." (as defined in the contract). `parseGen3PCBoxes` does this, but `parseGen3PCBuffer` fails to do so. Also in `parseGen3` where PC boxes are parsed it wraps it in an empty catch `catch {}` which swallows all errors.

## Action Taken
- Transitioned `task-340-341-gen3-safari-zone-state-impl` to `FAILED` status.
- Added `rejection_reason` explaining the violations.
- Incremented `rejection_count`.
- Left Acceptance Criteria checkboxes as they were (per Transient Rejection policy).

## Guidelines Followed
- **Triggering Transient Rejections**: Failed the target task without checking off checkboxes in its markdown body.
- **Strict Architecture Check**: Magic number and `RangeError` handling rules were strictly enforced based on task requirements and schema.
