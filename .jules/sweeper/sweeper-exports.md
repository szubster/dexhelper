## Sweeper Journal - Clean up unused exports and knip config

**What:** Removed unused exports in `constants.ts` and updated `knip.json`.
**Why:** To resolve tech debt regarding unused exports.
**Outcome:** Successfully updated the code and `knip.json` configuration without issue.
**Pattern:** Found that removing exports only used in tests/locally does not negatively impact the codebase and helps with tree shaking. Verified usage with global grep first before making changes.
