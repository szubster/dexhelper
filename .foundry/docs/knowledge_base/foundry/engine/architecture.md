# Foundry Engine Architecture

The Foundry Engine automates the lifecycle of Foundry nodes (Ideas, Epics, Stories, Tasks) using a Directed Acyclic Graph (DAG) approach.

## Key Components

1.  **Orchestrator (`.github/scripts/foundry-orchestrator.ts`)**:
    *   Walks the `.foundry/` directory.
    *   Resolves dependencies by checking node status.
    *   Promotes `PENDING` nodes to `READY` if all dependencies are `COMPLETED`.
    *   Outputs a JSON array of `READY` nodes for GitHub Actions matrix processing.
    *   **Matrix Targeting**: Includes `repo_path` in the JSON output to allow downstream jobs to locate the file.

2.  **State Transition Script (`.github/scripts/foundry-active.ts`)**:
    *   Transitions a node from `READY` to `ACTIVE`.
    *   **Strict "Dumb" Diff Verification**: Before saving, it performs a character-by-character comparison (via `gray-matter` parsing) to ensure ONLY the `status`, `jules_session_id`, and `updated_at` fields were modified. This prevents accidental metadata corruption by autonomous processes.

3.  **Foundry Engine Workflow (`.github/workflows/foundry-engine.yml`)**:
    *   **Orchestrate Job**: Runs the orchestrator and sets an output for the matrix.
    *   **Execute Job**: Runs in parallel for each `READY` node.
    *   **Jules Invocation**: Generates a persona-aware prompt and calls the Jules API via `curl` with a reference to the main repository and specific node content.

## Best Practices

*   **Idempotency**: The orchestrator is designed to be re-run safely. Any node already in `READY` status is included in the output matrix.
*   **Audit Trail**: The `jules_session_id` is populated with the GitHub `run_id`, providing a direct link between the node state and the CI execution logs.
*   **Security**: Workflow is restricted to the `main` branch.
