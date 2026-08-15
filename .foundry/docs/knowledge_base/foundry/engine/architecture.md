# Foundry Engine Architecture

The Foundry Engine automates the lifecycle of Foundry nodes (`IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`, `RESEARCH`, `ADR`) using a Directed Acyclic Graph (DAG) approach.

## Key Components

### 1. Orchestrator (`.github/scripts/foundry-orchestrator.ts`)
* **Directory Discovery & Parsing**: Recursively walks `.foundry/` (excluding `journals/`, `fixtures/`, `archive/`, and non-ADR docs) and validates YAML frontmatter via Zod schemas.
* **DAG Map Construction**: Builds parent-child and dependency lookups using explicit `parent` frontmatter, `depends_on` arrays, markdown body links, and raw ID references.
* **Late-Binding Engine**: Keeps macro parent nodes (`IDEA`, `PRD`, `EPIC`, `STORY`) in a `PENDING` wait state while child tasks execute. Auto-checks completed child checkboxes in parent bodies and auto-remediates remaining acceptance criteria once all descendants reach `COMPLETED` or `CANCELLED`.
* **Cycle & Deadlock Prevention**: Performs DFS cycle detection among `PENDING` nodes and identifies hierarchical parent-child deadlocks, setting offending nodes to `FAILED`.
* **Preflight & Idempotent Generation**: Bypasses dispatch for nodes whose target artifacts already exist and are fully completed.
* **Critical Path Weighting & Matrix Output**: Calculates reverse-dependency depth (the number of downstream nodes unblocked by completing a node) and outputs a JSON matrix sorted by weight (descending) and creation date (ascending).

### 2. Heartbeat Monitor (`.github/scripts/foundry-heartbeat.ts`)
* **Active Session Monitoring**: Periodically scans `ACTIVE` nodes to track Jules session states and associated GitHub PRs.
* **Multi-Layer PR Discovery**: Identifies PRs via:
  1. **Jules Session API**: Direct lookup of session output PR URLs.
  2. **GitHub Search API**: Fallback search query by `jules_session_id`.
  3. **GitHub Pull List API**: Inspection of recent PR bodies and head branches.
* **PR Resolution Transitions**:
  * **Merged PR**: Transitions `ACTIVE` → `COMPLETED` for leaf tasks, or `ACTIVE` → `PENDING` for late-binding parent nodes with remaining unchecked criteria. For macro nodes (`IDEA`, `PRD`, `EPIC`), transitions `ACTIVE` → `VERIFYING` under `owner_persona: "auditor"`.
  * **Closed PR (Unmerged)**: Increments `rejection_count` and resurrects `ACTIVE` → `READY`. If `rejection_count >= 3`, transitions to `FAILED`.
* **Zombie & Failure Handling**: Transitions `ACTIVE` nodes without a PR or active session to `READY` (system failure) or `FAILED` (missing session ID or `NOT_FOUND`). Resurrects retryable `FAILED` nodes (`rejection_count < 3`) to `READY`.
* **Remote Branch Cleanup**: Automatically deletes remote git branches associated with `FAILED` or `CANCELLED` sessions that are not linked to open PRs or active nodes.

### 3. State Transition Script (`.github/scripts/foundry-active.ts`)
* **READY → ACTIVE Handoff**: Executed after spawning a Jules session to mutate status to `ACTIVE` and set `jules_session_id`.
* **Strict "Dumb" Diff Verification**: Ensures ONLY `status`, `jules_session_id`, `updated_at`, and `rejection_reason` frontmatter fields were altered, rejecting any unauthorized edits to the markdown body.

### 4. Foundry Engine Workflow (`.github/workflows/foundry-engine.yml`)
* **Scheduled & Dispatch Triggers**: Runs hourly or via manual workflow dispatch on `main`.
* **Orchestrate Job**: Executes `foundry-heartbeat.ts`, `verify-dag-refs.ts`, and `foundry-orchestrator.ts --strict`. Sets GitHub Actions matrix output.
* **Execute Job**: Processes `READY` nodes sequentially (`max-parallel: 1`) to eliminate git rebase/push collisions. Compiles agent context prompts on the fly, dispatches sessions to Jules API, updates state to `ACTIVE`, and commits to `main`.

## Architectural Best Practices

* **Idempotency**: Re-running the orchestrator is always safe. `READY` and `VERIFYING` nodes are re-collected without state corruption.
* **Single Source of Truth**: Markdown files with YAML frontmatter in `.foundry/` represent the complete system database.
* **No Uncontrolled Automerge**: All PRs submitted by agents require human/auditor review or automated validation before merging.
