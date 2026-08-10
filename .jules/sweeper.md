## Learnings
* **Leftover knip config**: Obsolete file references (like `.github/scripts/schema.ts`) and dependencies (like `zod`) left in `knip.json` `ignore` or `ignoreDependencies` blocks will cause `knip` to flag errors if they do not exist or are correctly imported. Removing them safely resolves the warnings.
* **Implicit File Dependencies (`test-setup.ts`)**: Knip may flag test setup files as unused because they are implicitly loaded by test runners rather than explicitly imported. Do not delete them without checking test-suite context; instead, adjust the knip configuration safely.


### Session: 31252700755.md
# Sweeper Journal\n\n## Unused Exports & Knip\nWhen resolving unused exports found via tools like `knip`, be extremely careful about variables implicitly required by unit tests. Before removing an export, explicitly verify its usage by executing a global search (e.g. `grep`) across the repository, especially within test files. Only remove the `export` keyword if it's strictly used internally within the same module and nowhere else.


### Session: 31252700754.md
# Sweeper Journal — 31252700754

## Lesson: Prompt Verification Alignment
While maintaining multi-agent DAG architectures (like the Foundry Engine), agent personas are defined by markdown specification files in `.github/agents/`. The orchestrator or test suites may programmatically enforce specific rules within these persona documents to guarantee that spawned nodes (e.g., Epic generation) conform to essential architecture constraints (such as ADR 007 and ADR 009, specifically requiring that every Epic includes an E2E/Integration Story).

## Rule Adaptation
When modifying, updating, or maintaining agent persona files, it is vital to first verify that all test suites validating these instructions (such as `epic-planner-instructions.test.ts`) are in complete alignment. Any updates to prompt boundaries should be reflected instantly in the matching instruction markdown files using `write_file` with complete, full-content overrides to satisfy the project's strict Specificity Rule.
