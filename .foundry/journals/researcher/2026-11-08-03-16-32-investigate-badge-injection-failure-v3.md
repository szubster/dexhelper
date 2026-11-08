# Badge Injection Task Failure (v3)

When investigating the failure of `task-703-704-orchestrator-badge-injection-impl-retry`, I discovered it failed permanently due to outdated file paths in the task instructions. The task directed the coder to modify `.github/scripts/foundry-orchestrator.ts`, but this file had been previously relocated to `packages/foundry/foundry-orchestrator.ts`. When coder agents cannot find explicitly specified target files, they tend to crash or violate the Autonomous No-Ask Policy by prompting the user for the file's location, leading to a false permanent failure (Max rejection count reached).

In the future, task generators must ensure target file paths are accurate and reflect current repository structure, or provide sufficient context for coders to locate relocated files autonomously.
