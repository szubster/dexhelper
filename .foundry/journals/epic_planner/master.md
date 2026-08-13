# Epic Planner Master Journal

- **Node State Compliance:** When generating replacement nodes for an impossible loop, remember to **not** check off the parent's markdown checkboxes if doing so would prematurely transition the parent node. Submit the PR without modifying the checkboxes in the parent.
- **Dependency Strictness:** When generating replacement nodes for permanently failed children, you must explicitly add the ID of the new root-cause `RESEARCH` node to the `depends_on` array of the replacement nodes to ensure a valid dependency graph. If left empty, the DAG orchestrator will schedule the retried epics immediately and concurrently with the research node.
