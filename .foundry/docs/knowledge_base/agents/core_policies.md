# Core Agent Policies

## Autonomous Communication & No-Ask Policy
**CRITICAL DIRECTIVE FOR ALL AGENTS & JULES:** You must **NEVER** ask the user for permission, input, feedback, or clarification during execution in chat, unless explicitly requested in the initial prompt. The answer to "Should I proceed?", "Should I open/submit a PR?", "Should I proceed with opening the PR?", or "Should I request code review?" is **ALWAYS YES** and must be executed autonomously without asking.

1. **PRs are the Sole Communication Channel:** Your goal is to produce pull requests and code/node modifications completely autonomously. Always open and submit PRs immediately when work or demotion steps are ready. Do NOT ask the user whether a PR should be opened or submitted, whether to request code review, or whether changes are acceptable in chat. PRs themselves are the formal channel for review and feedback.
2. **Prohibited Question Patterns:** Under NO circumstances should an agent post questions such as:
   - "Should I proceed?" / "Should I finalize changes?"
   - "Should I open a PR?" / "Should I submit the PR?"
   - "Should I request code review now?"
   - "Are there any other tasks you'd like me to focus on before submitting?"
   - "Is there anything else you'd like me to address before submitting?"
   - "Which option do you prefer?"
3. **Utilize Late Binding for Unknowns & Missing Context:** If you lack context, do not know an offset/specification, or encounter architectural ambiguities:
   - Do **NOT** ask the user for clarification or guidance in chat.
   - Instead, utilize Late Binding: create a new Foundry node (`IDEA`, `RESEARCH`, `ADR`, or `TASK` depending on the scope) in `.foundry/`.
   - Set the `owner_persona` to the appropriate persona (`architect`, `researcher`, `story_owner`, `tech_lead`, etc.) so that the missing information is investigated and resolved asynchronously via the DAG orchestrator pipeline.
   - Follow the correct Foundry directory structure and metadata conventions when creating these nodes.
4. **No Conversational Queries:** Never end a turn with conversational prompts or questions asking if the user wants you to proceed, open a PR, or choose options. Execute the best decision autonomously and submit the PR.

## Environment Troubleshooting
If `pnpm install` fails due to an unsupported Node engine version mismatch (e.g., `wanted: {"node":">=24.0.0"}`), temporarily disable the strict check using `pnpm config set engine-strict false` before installing.
If `pnpm install` hangs or fails during `lefthook install` or git hook setup, run `git config --unset-all --global core.hooksPath` before retrying the installation.

## Empty PR Policy
Completely empty PRs should be fine and automerged by GitHub actions (there is an action for that already).

**CRITICAL INSTRUCTION FOR EMPTY PRs:** Even when you make zero file changes (e.g., when the target artifact is already complete), you **MUST** still explicitly use the `submit` tool to create a Pull Request. If you simply end the session without calling `submit`, the Orchestrator's heartbeat will flag your session as a crashed zombie (FAILED).

**LATE-BINDING ORCHESTRATOR DEMOTION COMPLIANCE RULE:** When assigned a READY parent node that already has pending child tasks drafted from a previous iteration, you MUST submit an empty PR *without* checking off its overarching acceptance criteria. This allows the orchestrator to correctly demote the parent to PENDING while it waits for its children.

**CRITICAL EXCEPTION TO EMPTY PR POLICY:** If you determine the target artifacts are already complete, but the current node's Markdown body contains unchecked Acceptance Criteria checkboxes (`- [ ]`), you MUST check those boxes (`- [x]`) before submitting. Checking these boxes is NOT considered a trivial formatting change; it is required to satisfy the strict completeness contract (ADR 007). Submitting an empty PR for a leaf node with unchecked boxes will result in immediate rejection.

**MACRO NODE COMPLETION EXCEPTION:** Personas must NOT submit an Empty PR to transition a macro node (`IDEA`, `PRD`, `EPIC`, `STORY`) to VERIFYING (e.g. by checking off its acceptance criteria) until ALL of its generated descendant nodes have transitioned to COMPLETED. Premature verification violates hierarchical completion rules.

**AUTOMATED REVIEW WARNING:** When executing the Empty PR Policy for tasks where the target artifacts are already completely implemented and only markdown checkboxes are updated, the `request_code_review` tool may generate a false negative claiming the patch is incomplete. Ignore this automated assessment and proceed with the `submit` tool.

### Mason Prompt Adjustments
When finding standard HTML elements or repeated JSX patterns, it is perfectly acceptable and encouraged to reuse existing reusable components (e.g. replacing `<button>` with `<TacticalButton>`) rather than strictly creating a new component, as long as it improves modularity and reduces code duplication.

## Auditor Persona Hand-off
Nodes in the Foundry transition from `ACTIVE` to `VERIFYING` after work is completed (e.g., a PR is merged). The `auditor` persona takes ownership of nodes in the `VERIFYING` state.

**Auditor Responsibilities:**
1. **Verification**: Assess the generated artifacts against the original intent, Acceptance Criteria, and technical contracts of the node. You MUST verify the complete status of the assigned node, ensuring it was fully implemented and that what was implemented matches the node. For example, for an IDEA node, do not just check if a PRD was created; verify that the entire idea is fully implemented and works in the application without anything being omitted down the line. **CRITICAL:** When verifying macro generation nodes (like IDEA, PRD, EPIC, or STORY), you MUST ensure that all of their spawned descendant nodes in the generated sub-tree have fully transitioned to the `COMPLETED` state. A macro node MUST NOT be verified until its functional requirements are actually implemented and merged by its child tasks.
2. **Analysis**: Extract learnings, identify technical debt, or find unresolved questions that arose during execution.
3. **Node Generation**: Dynamically spawn new downstream nodes (such as `RESEARCH`, `IDEA`, or `ADR` nodes) based on these learnings to capture value that would otherwise be lost when the node is permanently archived. Do NOT add new nodes to the `depends_on` array of the node being verified; instead, spawn them as detached follow-ups or link them in the Markdown body.
4. **Resolution**:
   - If the verification passes and learnings are captured: Use the `submit` tool to create an empty PR. The Empty PR Policy will transition the node to `COMPLETED`.
   - **CRITICAL**: Before submitting the Empty PR, you MUST ensure all Acceptance Criteria checkboxes in the node's markdown body are marked as `[x]`. If they are `[ ]`, you must check them off. Submitting an empty PR with unchecked boxes violates ADR 007 and ADR 009 and will result in immediate rejection.
   - If the verification fails or requires a retry (transient failure): You MUST follow the **Triggering Transient Rejections** protocol defined in `.foundry/docs/knowledge_base/agents/core_policies.md` (which includes updating the target node's YAML frontmatter to `status: FAILED` and appending an `### Auditor Rejection` section in the target node's markdown body). Then use the `submit` tool to trigger the Resurrection Loop.

## Component Integration Policy
When creating implementation tasks for UI components, explicit integration steps and tests for rendering components must be included to ensure they are properly integrated into the application's view hierarchy. Otherwise, they risk permanent failure for being unlinked and unrenderable.

## Transient Logs
System failures, node state transitions (e.g. from FAILED to READY), and "is now COMPLETED" status log entries in Foundry journals add zero value to future runs and unnecessarily expand the context window. Such logs belong in orchestrator execution logs or PR history, not long-term agent journals.

## Prompt Compilation Architecture & Fragment Layering
The Foundry Orchestrator (`.github/scripts/foundry-orchestrator.ts`) dynamically compiles agent prompts at dispatch time using a 3-tier layered composition:
1. **Base Persona Prompt**: Loaded from `.github/agents/<persona>.md` (or `.github/agents/generic/<persona>.md`).
2. **Specific Context Layers**: Loaded from `.github/agents/specific/<tag|layer>.md` based on tags/layers specified in the node frontmatter (e.g., `typescript`, `react`, `dexhelper`).
3. **Core System Policies**: Loaded from `.foundry/docs/knowledge_base/agents/core_policies.md` and appended to every compiled prompt.

**Optimization Rules for Agents:**
- Do not copy-paste or duplicate instructions from `core_policies.md` or layer files into base persona prompts (`.github/agents/*.md`).
- Scheduled meta-agents (e.g., `agile_coach`, `tpm`) proposing prompt improvements must account for auto-appended core policies to prevent redundant instructions and context token bloat.

## Styling Ownership (Palette Persona)
The `palette` persona is the master of the Tailwind and styling ecosystem. This includes:
1. Maintaining custom primitives in `src/index.css` using the `@utility` directive.
2. Consolidating repeating utility combinations.
3. Ensuring styling adherence to the tactical hardware aesthetic guidelines (e.g., `rounded-none`, `border-dashed`, monospaced fonts) as defined in ADR 024.

## Execution Plan Rules
**Execution Plan Sequencing Rule:** When formulating an execution plan, the required pre-commit verification step must be placed immediately before the final submission or PR creation step, with no intervening actions separating them.
**Execution Plan Verification Rule:** Execution plans that involve creating new files or modifying existing ones must explicitly include verification steps (e.g., using `read_file`) immediately following the modifications to confirm the changes were written correctly.
**Empty PR Verification Rule:** Even when submitting an Empty PR (zero file changes) to allow the orchestrator to demote a parent node, the execution plan must explicitly include a preliminary step to run core verification commands (`pnpm lint`, `pnpm test`, and `xvfb-run pnpm test:e2e`) to verify a clean system state before submission. Do not include unmentioned commands (e.g., `pnpm type-check`), as this violates the Groundedness Rule.
**Execution Plan Groundedness Rule:** Execution plans must not propose actions that have already been successfully completed in the bash session. Your plan must reflect the current state of the workspace. Furthermore, you must not read files or use file paths that have not been explicitly discovered and printed in the current session's trace. Do not propose creating files with assumed, guessed, or placeholder names (e.g., `<NNN>`). Determine exact filenames before plan creation.
**Execution Plan Specificity Rule:** Execution plans must consist solely of single, actionable, un-nested instructions. Conversational monologue, mental actions, scratchpad notes, placeholders, and nested bullet points are strictly forbidden.
**Execution Plan Tense Rule:** Execution plans must consist solely of forward-looking, actionable steps required to complete the task. Do not include past-tense descriptions or summaries of actions already completed during the exploratory phase.
**Plan Review Citation Rule:** When using the `request_plan_review` tool, you must explicitly cite the exact file path of the documentation or source code (e.g., `.foundry/docs/knowledge_base/...`) that provides the business logic, formulas, or constants referenced in your plan steps. Failure to do so may cause the reviewer to incorrectly reject the plan for 'hallucinations'.


## Scratchpad Cleanup
**CRITICAL:** Any developer scratchpad scripts created during a session (e.g., temporary bash scripts like `generate_reads.sh` or Node scripts) must be deleted (`rm`) before finalizing the PR. Leaving them pollutes the root directory and triggers rejection during code review.

## Mandatory Context Initialization
**CRITICAL:** When you begin your session, you **must** establish context by explicitly reading the following documents:
- All documents under `.foundry/docs/`
- All documents under `.foundry/docs/knowledge_base/`
- All documents under `.foundry/archive/docs/adrs/`

Ensure you are fully aware of and adhere to the rules outlined in `.foundry/archive/docs/adrs/001-the-foundry-architecture.md`.

When explicitly reading these contextual documents, you MUST use the `read_file` tool to read each document individually. Avoid using `cat` or bash loops on multiple files to prevent truncation and ensure full compliance with the Exploration Rule.

## Node Creation Guidelines
While the system does not strictly block node creation, ANY scheduled or foundry agent can dynamically create new `IDEA`, `TASK`, `RESEARCH`, or `ADR` nodes in the `.foundry/` directory. If you encounter larger architectural changes, find technical debt, realize a task needs an idea/research, or lack context, you should create a node. For example, a task could result in an idea, and scheduled agents can create nodes in foundry. When creating downstream nodes, ensure you set the `owner_persona` correctly (e.g., `researcher` for RESEARCH nodes, `architect` for ADRs).

## Triggering Transient Rejections
If you reject an implementation or validation fails (transient error):
1. You MUST update the target task's YAML frontmatter to `status: FAILED`.
2. You MUST provide a clear `rejection_reason` in the target task's YAML frontmatter.
3. You MUST increment the target task's `rejection_count` in its YAML frontmatter (if it doesn't exist, initialize it to 1).
4. You MUST NOT check off the Acceptance Criteria checkboxes in the markdown body of the failed task.
5. You MUST NOT modify your own task's YAML frontmatter (e.g., your QA or Auditor task must remain ACTIVE). Only update your own markdown body to note the failure.
6. You MUST document the rejection in your persona journal.

## Handling Rejections & Aborts
**CRITICAL - RESUMING FAILED NODES/TASKS:** If you are assigned to a node that was previously FAILED and has been resurrected, you MUST explicitly read its `rejection_reason` in the YAML frontmatter and explicitly read the Auditor or QA persona's journal (`.foundry/journals/auditor/*.md` or `.foundry/journals/qa/*.md`) using `read_file` to understand the exact root cause of the previous failure. You must ensure you address the reviewer's feedback and remove the `### Auditor Rejection` block (and its contents) from the markdown body rather than blindly resubmitting.

If you encounter a permanent failure, reach max rejection count, or must abort a node because it is impossible:
1. You MUST update the target node's YAML frontmatter to `status: CANCELLED` (do NOT use `FAILED` for permanent aborts, as that triggers infinite resurrection loops). This formally drops it from the DAG and triggers the parent's Impossible Loop. Leaving it as `FAILED` will cause endless resurrection loops.
2. You MUST provide a clear `rejection_reason` in the target node's YAML frontmatter.
3. You MUST NOT check off the Acceptance Criteria checkboxes in the markdown body of the failed node.
4. You MUST document the failure in your persona journal.

## Handling Permanent Child Failures (The Impossible Loop)
If you are woken up by the Orchestrator because a child node reached its Max Rejection Count (e.g., a TASK or STORY failed permanently), you MUST:
1. Spawn a `RESEARCH` node to investigate the root cause of the failure.
2. Create a new set of replacement nodes that explicitly depend on the `RESEARCH` node being completed.
3. Append these new nodes to your own markdown body.
4. **CRITICAL:** You MUST check off the markdown checkboxes (`- [x]`) of the permanently failed child nodes in your own markdown body. If they remain unchecked, ADR 007 will prevent this parent node from ever transitioning to COMPLETED.

## Handling Cancelled/Replaced Tasks (Graceful Exit)
If your target task has been permanently failed, replaced, or explicitly cancelled via a note in the Markdown body:
1. You MUST check off your own Acceptance Criteria checkboxes in your task's Markdown body.
2. You MUST use the `submit` tool to create an Empty PR. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED and gracefully exit the DAG.

If a cancelled or replaced task node is reawakened (e.g., because its previous implementation dependency finished, triggering the Empty PR flow), you MUST still check off the acceptance criteria to allow the node to gracefully exit the DAG, satisfying ADR 007's completeness requirements. Even if no real work is needed, those checkboxes must be checked for the node to safely transition to COMPLETED.

## Late Binding for Missing Context & Task Suspension
If you lack critical context or specifications (e.g., exact memory offsets) necessary to implement a task or generate actionable blueprints, DO NOT guess or implement generic fallbacks. Instead, you MUST utilize the late binding pattern to suspend the task:
1. Spawn a new `RESEARCH` node to investigate the missing information, setting `parent: <current_task_id>` in the `RESEARCH` node's YAML frontmatter. Do **NOT** add the `RESEARCH` node to the current task's `depends_on` array (parents implicitly depend on their children; adding it to `depends_on` creates a circular dependency deadlock).
2. Append the new `RESEARCH` node reference as an unchecked task (`- [ ] <research_node_id>`) into the Markdown body of the current task.
3. Update the current task's `status` to `FAILED` and provide a clear `rejection_reason` indicating that it is suspended pending research.

## Journaling Policies
**CRITICAL:** Your private journal (whether in `.jules/` or `.foundry/journals/`) is your **only private memory** across sessions.
1. When you see something worth remembering—such as a recurring pattern, a failed attempt, or a project-specific constraint—you MUST generate a memory by updating your persona journal.
2. Your journal is strictly for logging long-term lessons, architectural constraints, and recurring failures.
3. Do not use your journal as a logbook or a ledger to record completed tasks, PRs merged, or steps taken ('I did X'). The orchestrator and PR history already track what happened.
4. Your journal must explain *why* it matters and what rules must be adapted moving forward. Logging meaningless execution traces wastes context tokens and degrades your long-term memory capability.
5. If the knowledge is universally applicable and should be shared across all agents, you MUST instead update or create a relevant document in `.foundry/docs/` rather than burying it in your private journal.

## YAML Frontmatter Rules
**CRITICAL**: When successfully completing a node, DO NOT modify its YAML frontmatter; only update the markdown body (e.g., checking off acceptance criteria checkboxes). Modifying the YAML frontmatter is only permitted when explicitly changing the status to FAILED or CANCELLED.

## Node Generation Rules
- **Artifact Anomaly Detection**: When a target Foundry artifact (such as a downstream PRD or generated node file) unexpectedly exists prior to the session, create a small journal entry detailing the anomaly for later review.
- **DAG ID Strictness**: When setting the `depends_on` or `parent` fields in node frontmatter, you MUST strictly use exact Node IDs without file extensions (e.g., `prd-066-036-time-capsule-validator`), not repo-relative file paths.
- **Mandate Decomposition, Granularity, and Late Binding**: To ensure predictable execution and maximum pipeline throughput, all generative personas (PM, Epic Planner, Story Owner, Tech Lead) MUST actively decompose broad concepts into multiple, smaller, highly-focused downstream nodes rather than single monolithic nodes or 1-to-1 mappings.
  - **Avoid the "Two-Tasks-Max" Anti-pattern**: Personas (especially the Tech Lead) must NOT simply decompose a STORY into exactly two tasks (e.g., one Coder task and one QA task). A STORY must be broken down into multiple, discrete, modular steps of execution (e.g., separate save-file parsing logic, React context/state layer, UI presentation component, and separate QA verification). Do not group type definitions, core logic implementation, and unit testing into a single monolithic task. Decompose them into distinct, modular TASK nodes.
  - **Leverage Late Binding**: Personas should not try to pre-determine and map out every single implementation detail or downstream node upfront. Draft the initial high-confidence nodes first, and actively use the "late-binding" pattern to dynamically spawn and chain subsequent downstream nodes in future sessions as requirements crystallize and progress is achieved.
- **Orchestrator Safeguard (E2E/Integration Requirement)**: When breaking down Epics, all generative personas (Epic Planner, Story Owner) MUST enforce a process where every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). An EPIC cannot be marked `COMPLETED` by the orchestrator unless this requirement is met.
- **E2E Testing Scope for Generative Personas:** Generative personas (e.g., `story_owner`, `epic_planner`, `product_manager`) drafting or updating markdown nodes do NOT need to execute Playwright E2E test suites locally in the background during node generation sessions. Unless a task specifically involves writing or modifying E2E tests or UI implementation code, agents must rely on linting/unit testing and allow GitHub CI to run full E2E verification suites.
- **Owner Persona**: Set the `owner_persona` of newly created downstream nodes to the persona responsible for the NEXT pipeline transition (e.g., `epic_planner` for PRDs, `story_owner` for EPICs, `tech_lead` for STORY nodes, `coder` for TASKs), not yourself. **CRITICAL:** When generating a PRD, you MUST explicitly set `owner_persona: epic_planner`. Assigning it to `product_manager` breaks the downstream handoff chain.
- **Sequence Numbers**: Determine the correctly incremented global sequence number by listing and sorting the existing files in the corresponding directory (e.g., `ls -1 .foundry/tasks/ | sort -n -t '-' -k 3`).
- **Pipeline Order**: The strict pipeline order and persona handoff for Foundry nodes is: IDEA (PM) -> PRD (Epic Planner) -> ADR (Architect) -> EPIC (Planner) -> STORY -> TASK.
- **Schema Strictness**: When creating a new node, strictly follow the Parent-Linked ID Schema: `<type>-<parent_NNN>-<NNN>-<slug>` as detailed in `.foundry/docs/schema.md`.
- **Appending Children**: Append references to newly generated child nodes as **unchecked tasks (`- [ ]`)** directly into the markdown body of the parent node, and check off your specific acceptance criteria checkboxes (e.g., `- [x] Break down into Tasks`) WITHOUT modifying the parent's YAML frontmatter. When appending child nodes as unchecked tasks (`- [ ] <node_id>`), strictly use the exact Node ID without file extensions or directory paths. Furthermore, verify if the parent has an `## Acceptance Criteria` section. If it does not exist, explicitly append the header `## Acceptance Criteria` along with the checkbox to ensure proper formatting. This ensures the parent node does not prematurely transition to VERIFYING before its children are completed.
- **Circular Dependencies**: Do NOT include the parent node in the new child's `depends_on` array to avoid circular dependency deadlocks.
- **Premature Verification**: Do NOT submit an Empty PR to transition a parent node to VERIFYING (by checking off its acceptance criteria) until ALL of its generated child nodes have transitioned to COMPLETED. Premature verification violates the dependency graph constraints.
- **Parent Node Syntax**: Parent generation nodes MUST strictly format references to generated child nodes as unchecked task checkboxes (`- [ ] <file_path>`) directly in their markdown body. If the checkbox is omitted, formatted as plain text, or immediately checked, the Orchestrator will prematurely transition the parent to VERIFYING before descendant nodes complete, leading to immediate rejection.

## Bash Session Timeout Policy
* Never execute blocking commands (e.g., `tail -f`, long-running loops) in `run_in_bash_session` as they will cause the session to hang indefinitely.
* Use non-blocking alternatives like `cat` or `tail -n`.
* If a long-running process must be executed, it must be backgrounded (`&`) or wrapped using the standard GNU `timeout` command (e.g., `timeout 30s command`).
* **Timeout Interruption Feedback:** When the `timeout` command successfully interrupts a process that exceeds the specified duration, it returns **exit code 124**. Agents MUST recognize exit code 124 as an explicit timeout indicator, rather than a generic command failure, and MUST switch to using non-blocking alternatives (like `cat` or `tail -n`) instead of retrying the blocking command.

## Quality Assurance & Testing Policy
Before marking a task as COMPLETED or approving it, you MUST run `pnpm lint && pnpm test` to ensure project health and that no regressions are introduced.
**Prohibited Testing Libraries:** Do NOT use `@testing-library/react` or `@testing-library/*`. Use `vitest-browser-react` for browser component testing and `@playwright/test` for E2E testing.
To automatically fix code formatting errors flagged by Biome during lint checks, run `pnpm check:fix` or `pnpm format:biome`.
When modifying or verifying central systems like the DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`), you MUST also explicitly run its test suite (`cd .github/scripts && pnpm install && npx vitest`) and verify that no test functionality is broken.

## Task Drafting & Verification Protocols
- **Intelligent Verification Protocol**: Tech Leads must intelligently decide when a STORY requires a separate QA verification task. If a story involves complex logic or risk, create a matching TASK for the `qa` persona to verify the `coder`'s work. If simple/low-risk, designate the `coder` to self-verify. While generally QA tasks verify implementations, the coder is always responsible for writing tests. For simple tasks, it is acceptable for the Tech Lead to decide that the coder's tests and implementation are sufficient without a dedicated, explicit QA task pair.

## Architectural & Coding Constraints
- **Save File Parsing**: When implementing save file parsing, extraction functions, or mapping bitwise blocks, you MUST strictly adhere to the guidelines defined in **Section 13 ("Save File Parsing & Extraction Guidelines")** of `.foundry/docs/schema.md`. This includes rules regarding module-level constants, avoiding magic numbers, using relative offsets for Gen 3, and catching `RangeError`.
- **UI Aesthetic Constraints (ADR 008)**: When implementing UI components, you MUST adhere strictly to the "tactical hardware/snooping" aesthetic outlined in ADR 008. Explicitly use sharp edges (`rounded-none`). Strictly avoid any rounded corners (e.g., do not use `rounded-t`, `rounded-b`, `rounded-sm`, etc.). Use dashed borders (`border-dashed`) and monospaced telemetry fonts (e.g. `font-mono`).
- **Architectural Scaffolding & Shared State**: If a Story involves complex shared state or architectural patterns (such as those mandated by ADR 013 and ADR 017), blueprints MUST provide explicit scaffolding instructions (e.g., explicitly instructing the coder to define the React Context layer first before implementing the UI components).
- **Architectural Compliance & Enforcement**: When a QA agent rejects a task for missing architectural requirements, the coder MUST comprehensively implement the missing architectural layer (no faking fixes). QA agents MUST strictly enforce architectural patterns mandated by ADRs and explicitly document persistent failures.
- **Vitest Mocks**: Vitest requires explicit generic typing on `vi.fn()` mocks (e.g. `vi.fn<(type: string) => void>()`) when testing callback props for components, to satisfy `vitest(require-mock-type-parameters)`.

## Playwright E2E Best Practices
- Always use the `-a` flag with `xvfb-run` (e.g., `xvfb-run -a pnpm test:e2e`) during headless execution to bypass lock issues.
- **Target Specific Files**: When running Playwright E2E tests locally to verify code changes, execute only the affected test files (e.g., `xvfb-run -a pnpm test:e2e tests/e2e/home.spec.ts`) to avoid triggering the 400-second bash session timeout.
- **No Binary Installation**: Assume Playwright browser binaries are pre-installed in the environment. Do NOT run `pnpm exec playwright install` yourself during a session.
- **Vite Cache Clearing**: When intentionally modifying application source code via bash, clear the Vite cache (`rm -rf node_modules/.vite`) before rerunning the tests to ensure the local Playwright webServer serves the latest code.
