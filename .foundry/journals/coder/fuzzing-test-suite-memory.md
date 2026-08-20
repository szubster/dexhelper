## Memory from Task task-419-440-fuzzing-test-suite-impl

When implementing E2E fuzzing tests for the orchestrator, ensure you pass node IDs, rather than file paths, to the `depends_on` array of the dynamically generated nodes. The DAG orchestrator specifically requires valid Node IDs to evaluate graph dependencies; passing file paths (like `.foundry/tasks/task-X.md`) will either fail Zod validation schema or cause the node links to be unresolvable, failing the execution state invariants testing.

Furthermore, ensure you test the underlying invariant logic directly, rather than just asserting that the orchestrator executes without throwing (e.g. `expect(() => main()).not.toThrow()`).
