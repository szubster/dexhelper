## Entry from 10610034023932477089.md

# QA Session 10610034023932477089

- Executed Empty PR policy for completed implementation of `task-286-403-filter-swarm-item-calls-qa`.
- Ensured `### SCHEMA` link at the bottom of markdown was preserved to avoid rejection during plan review by explicitly reading the bottom 500 characters using `tail -c 500`.
- Verified file write modifications and test stability to satisfy completeness rules before submittal.

## Entry from 11361217312313065104.md

- Verified Gen 3 IV/PV Extraction implementation met all acceptance criteria, tests are passing, no regressions found.

## Entry from 12960983747185356556.md

# QA Journal - 12960983747185356556

## Learnings
- **Recurring Issue:** Coders frequently violate Section 13 (No Magic Numbers) of `.foundry/docs/schema.md` when parsing Gen 3 Secret Base data.
- **Specific Instance:** In `task-404-408-gen3-secret-base-parser-impl`, the implementation hardcoded `0` to check for empty secret bases (`if (secretBaseId === 0)`) and in the bitwise flag check (`(flags & BATTLED_OWNER_TODAY_MASK) !== 0`), instead of defining and using module-level constants for these values.
- **Action Required:** Ensure coders are explicitly reminded of Section 13 constraints, particularly regarding implicit/magic numbers like `0` in conditional statements.

## Entry from 14509821843729640775.md

The task was already implemented. Checked the markdown boxes and submitted an empty PR.