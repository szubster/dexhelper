## Learnings
* **Leftover knip config**: `.github/scripts/schema.ts` was still listed in `ignore` in `knip.json` even though it is actively used and correctly imported. Removing it from `knip.json` safely resolves the warning and ensures it correctly gets type-checked and tracked by knip.

## Lesson: Prompt Verification Alignment
While maintaining multi-agent DAG architectures (like the Foundry Engine), agent personas are defined by markdown specification files in `.github/agents/`. The orchestrator or test suites may programmatically enforce specific rules within these persona documents to guarantee that spawned nodes (e.g., Epic generation) conform to essential architecture constraints (such as ADR 007 and ADR 009, specifically requiring that every Epic includes an E2E/Integration Story).

## Rule Adaptation
When modifying, updating, or maintaining agent persona files, it is vital to first verify that all test suites validating these instructions (such as `epic-planner-instructions.test.ts`) are in complete alignment. Any updates to prompt boundaries should be reflected instantly in the matching instruction markdown files using `write_file` with complete, full-content overrides to satisfy the project's strict Specificity Rule.

## Unused Exports & Knip
When resolving unused exports found via tools like `knip`, be extremely careful about variables implicitly required by unit tests. Before removing an export, explicitly verify its usage by executing a global search (e.g. `grep`) across the repository, especially within test files. Only remove the `export` keyword if it's strictly used internally within the same module and nowhere else. Unused barrel files, like `src/engine/index.ts` which was entirely unused and caught by `knip`, can be safely deleted. Obsolete configs in tools like `knip.json`'s ignore list should also be cleaned up to prevent configuration hints and warnings from the tool.


# Sweeper Session\n\n## Actions\nDeleted unused barrel file `src/contexts/index.ts` which only exported `RibbonFilterContext`.\n\n## Learnings\nAlways verify dead code with tools like `knip` and `grep` before deletion. When deleting a barrel file, ensure that any other module relying on it is refactored.
