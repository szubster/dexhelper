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
