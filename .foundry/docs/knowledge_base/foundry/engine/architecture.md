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
    *   **Strict "Dumb" Diff Verification**: Before saving, it performs a character-by-character comparison (via `gray-matter` parsing) to ensure ONLY the `status`, `jules_session_id`, and `updated_at` fields were modified.
    *   **Robust Metadata Handling**: The script uses regex patterns that handle optional quotes (e.g., `status: "READY"`) and implements an `upsertField` logic to gracefully handle missing fields by appending them to the frontmatter. This prevents transition failures due to minor formatting differences and accidental metadata corruption by autonomous processes.

3.  **Foundry Engine Workflow (`.github/workflows/foundry-engine.yml`)**:
    *   **Orchestrate Job**: Runs the orchestrator and sets an output for the matrix.
    *   **Execute Job**: Runs in parallel for each `READY` node.
    *   **Jules Invocation**: Generates a persona-aware prompt and calls the Jules API via `curl` with a reference to the main repository and specific node content.


3. **Heartbeat Script (`.github/scripts/foundry-heartbeat.ts`)**:
    *   Monitors `ACTIVE` nodes to verify they aren't "zombies" (active nodes with dead or missing PRs).
    *   **Robust PR Discovery**: Uses a multi-layered lookup strategy:
        1.  **Jules Session API**: Fetches the session object and extracts the PR URL from `outputs[].pullRequest.url`.
        2.  **GitHub Search API**: Fallback search for the session ID in PRs.
        3.  **GitHub List API**: Fallback scan of recent PR bodies/branches for the session ID.
    *   **Zombie Detection Logic**: Only transitions a node to `FAILED` if the Jules session is in a terminal state (`FAILED`, `COMPLETED`) **and** no PR was discovered via any of the above methods. This prevents false-positives caused by GitHub Search indexing lag.
    *   **Resurrection**: Automatically moves `FAILED` nodes back to `READY` to allow the engine to retry them in the next cycle.

## Best Practices

*   **Idempotency**: The orchestrator is designed to be re-run safely. Any node already in `READY` status is included in the output matrix.
*   **Audit Trail**: The `jules_session_id` is populated with the ID returned by the Jules API, providing a direct link between the node state and the automated agent session. The GitHub `run_id` is typically included in the commit message to provide secondary linkage to CI logs.
*   **Security**: Workflow is restricted to the `main` branch.
