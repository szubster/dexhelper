# Core Agent Policies

## Environment Troubleshooting
If `pnpm install` fails due to an unsupported Node engine version mismatch (e.g., `wanted: {"node":">=24.0.0"}`), temporarily disable the strict check using `pnpm config set engine-strict false` before installing.
If `pnpm install` hangs or fails during `lefthook install` or git hook setup, run `git config --unset-all --global core.hooksPath` before retrying the installation.

## Empty PR Policy
Completely empty PRs should be fine and automerged by GitHub actions (there is an action for that already).

**CRITICAL INSTRUCTION FOR EMPTY PRs:** Even when you make zero file changes (e.g., when the target artifact is already complete), you **MUST** still explicitly use the `submit` tool to create a Pull Request. If you simply end the session without calling `submit`, the Orchestrator's heartbeat will flag your session as a crashed zombie (FAILED).

**CRITICAL EXCEPTION TO EMPTY PR POLICY:** If you determine the target artifacts are already complete, but the current node's Markdown body contains unchecked Acceptance Criteria checkboxes (`- [ ]`), you MUST check those boxes (`- [x]`) and commit the file. Checking these boxes is NOT considered a trivial formatting change; it is required to satisfy the strict completeness contract (ADR 007). Submitting an empty PR for a leaf node with unchecked boxes will result in immediate rejection.
