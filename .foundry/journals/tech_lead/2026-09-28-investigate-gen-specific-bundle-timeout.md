# Tech Lead Journal: Handling E2E Timeouts and Permanent Failures

When a child node fails permanently due to a timeout (e.g. `task-429-473-generate-gen-specific-bundles` failed with `[ACKNOWLEDGED] Max rejection count reached`), I must use the "Impossible Loop" handling rule by:
1. Spawning a `RESEARCH` node assigned to the `researcher` persona to investigate the root cause of the timeout.
2. Creating a new set of replacement `TASK` nodes (`coder` and `qa`) that depend on the `RESEARCH` node.
3. Marking the failed child task as complete (`- [x]`) in the parent's markdown body.
4. Appending the newly spawned nodes as unchecked tasks (`- [ ]`) to properly utilize late binding.

This ensures we don't infinitely loop on timeouts without explicitly uncovering why it is failing.
