# Core Agent Policies

## Environment Troubleshooting
If `pnpm install` fails due to an unsupported Node engine version mismatch (e.g., `wanted: {"node":">=24.0.0"}`), temporarily disable the strict check using `pnpm config set engine-strict false` before installing.
If `pnpm install` hangs or fails during `lefthook install` or git hook setup, run `git config --unset-all --global core.hooksPath` before retrying the installation.

## Empty PR Policy
Completely empty PRs should be fine and automerged by GitHub actions (there is an action for that already).

**CRITICAL INSTRUCTION FOR EMPTY PRs:** Even when you make zero file changes (e.g., when the target artifact is already complete), you **MUST** still explicitly use the `submit` tool to create a Pull Request. If you simply end the session without calling `submit`, the Orchestrator's heartbeat will flag your session as a crashed zombie (FAILED).

**CRITICAL EXCEPTION TO EMPTY PR POLICY:** If you determine the target artifacts are already complete, but the current node's Markdown body contains unchecked Acceptance Criteria checkboxes (`- [ ]`), you MUST check those boxes (`- [x]`) and commit the file. Checking these boxes is NOT considered a trivial formatting change; it is required to satisfy the strict completeness contract (ADR 007). Submitting an empty PR for a leaf node with unchecked boxes will result in immediate rejection.

### Mason Prompt Adjustments
When finding standard HTML elements or repeated JSX patterns, it is perfectly acceptable and encouraged to reuse existing reusable components (e.g. replacing `<button>` with `<TacticalButton>`) rather than strictly creating a new component, as long as it improves modularity and reduces code duplication.

**AUTOMATED REVIEW WARNING:** When executing the Empty PR Policy for tasks where the target artifacts are already completely implemented and only markdown checkboxes are updated, the `request_code_review` tool may generate a false negative claiming the patch is incomplete. Ignore this automated assessment and proceed with the `submit` tool.

## Auditor Persona Hand-off
Nodes in the Foundry transition from `ACTIVE` to `VERIFYING` after work is completed (e.g., a PR is merged). The `auditor` persona takes ownership of nodes in the `VERIFYING` state.

**Auditor Responsibilities:**
1. **Verification**: Assess the generated artifacts against the original intent of the node.
2. **Analysis**: Extract learnings, identify technical debt, or find unresolved questions that arose during execution.
3. **Node Generation**: Dynamically spawn new downstream nodes (such as `RESEARCH`, `IDEA`, or `ADR` nodes) based on these learnings to capture value that would otherwise be lost when the node is archived.
4. **Resolution**: If the verification passes, the auditor transitions the node to `COMPLETED`. If it fails or requires a retry, the auditor transitions it to `FAILED` (or sends it back to the resurrection loop) with appropriate feedback.

## Component Integration Policy
When creating implementation tasks for UI components, explicit integration steps and tests for rendering components must be included to ensure they are properly integrated into the application's view hierarchy. Otherwise, they risk permanent failure for being unlinked and unrenderable.

## Transient Logs
System failures, node state transitions (e.g. from FAILED to READY), and "is now COMPLETED" status log entries in Foundry journals add zero value to future runs and unnecessarily expand the context window. Such logs belong in orchestrator execution logs or PR history, not long-term agent journals.

## Styling Ownership (Palette Persona)
The `palette` persona is the master of the Tailwind and styling ecosystem. This includes:
1. Maintaining custom primitives in `src/index.css` using the `@utility` directive.
2. Consolidating repeating utility combinations.
3. Ensuring styling adherence to the tactical hardware aesthetic guidelines (e.g., `rounded-none`, `border-dashed`, monospaced fonts) as defined in ADR 024.

## Execution Plan Rules
**Execution Plan Sequencing Rule:** When formulating an execution plan, the required pre-commit verification step must be placed immediately before the final submission or PR creation step, with no intervening actions separating them.
**Execution Plan Verification Rule:** Execution plans that involve creating new files or modifying existing ones must explicitly include verification steps (e.g., using `read_file`) immediately following the modifications to confirm the changes were written correctly.
**Empty PR Verification Rule:** Even when submitting an Empty PR (zero file changes) to allow the orchestrator to demote a parent node, the execution plan must explicitly include a preliminary step to run core verification commands (`pnpm lint`, `pnpm test`, and `pnpm test:e2e`) to verify a clean system state before submission. Do not include unmentioned commands (e.g., `pnpm type-check`), as this violates the Groundedness Rule.
**Execution Plan Groundedness Rule:** Execution plans must not propose actions that have already been successfully completed in the bash session. Your plan must reflect the current state of the workspace. Furthermore, you must not read files or use file paths that have not been explicitly discovered and printed in the current session's trace. Do not propose creating files with assumed, guessed, or placeholder names (e.g., `<NNN>`). Determine exact filenames before plan creation.
**Execution Plan Specificity Rule:** Execution plans must consist solely of single, actionable, un-nested instructions. Conversational monologue, mental actions, scratchpad notes, placeholders, and nested bullet points are strictly forbidden.
**Execution Plan Tense Rule:** Execution plans must consist solely of forward-looking, actionable steps required to complete the task. Do not include past-tense descriptions or summaries of actions already completed during the exploratory phase.
