## 2026-06-01 - [Accepted] - Prompt improvement - Prevent Oak from modifying Foundry DAG nodes
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Agent PR history showed Oak repeatedly fixing `jules_session_id` and parent links in `.foundry/` DAG nodes instead of doing its actual domain tasks. Oak interpreted "Data Integrity" as applying to DAG files.
**Pattern:** When an agent's domain name (like "Data Integrity") is broad, it must explicitly exclude meta-files (like `.foundry/`) to prevent it from getting distracted by orchestrator warnings.

## 2025-04-19 - [Accepted] - New agent: Sweeper (Code Health & Tech Debt)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (code health PR prefix). Note: The user explicitly wants to keep both `bundlemon` and Codecov Vite plugin in the project. They are used intentionally in parallel, so agents should never remove `bundlemon` as an "unused" dependency.

## 2026-04-19 - [Accepted] - New agent: Shield (Security & Cryptography)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (CWE-209 prevention, native `node:crypto` usage, and security fix PR title format).

## 2026-04-20 - [Accepted] - prompt improvement - Add visual regression testing to Sentinel
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer merged the changes.
**Pattern:** Proposing an improvement based on specific missing test strategies found in the ecosystem.
## 2025-04-22 - [Rejected] - Prompt improvement - Ensure Strategist properly discovers and logs unrecorded past outcomes
**Type:** Prompt improvement
**Outcome:** Rejected → journaled
**Why:** The maintainer rejected the proposal to use `git log` to retroactively discover outcomes, stating explicitly: "They should not look at past commits to figure out their memory, as journal always has them. Every PR either has code changes + journal (optionally, if useful), or journal only with rejection statement and reason for future learning."
**Pattern:** Do not propose tracking memory through past commits instead of the explicit journal mechanism defined in the "Wait and Convert" flow.

## 2025-04-23 - [Accepted] - Prompt improvement - Remove Git/PR history as memory source
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Maintainer clarified that agents should not look at past commits to figure out their memory, as the journal always has them.
**Pattern:** Do not instruct agents to read PR history for cross-session memory.

## 2026-05-15 - [Accepted] - Prompt improvement - Update PR titles and bodies to match system memory
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The PR formatting rules in the agent prompts needed to match the explicit rules in the system memory.
**Pattern:** Proposing changes to correctly format agent output based on the project's requirements.

## 2026-06-02 - [Accepted] - Prompt improvement - Update Shield to prevent CWE-285 and fix PR title
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires Shield to use the 🔐 emoji for PR titles, and to prevent CWE-285 vulnerabilities (using String.includes on URLs instead of startsWith).
**Pattern:** Proposing changes to update security prompts according to CI constraints (CodeQL) and project title conventions.
## 2026-06-03 - [Accepted] - Prompt improvement - Update Canvas to adhere to project aesthetic
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** System memory requires the Canvas persona to adhere to a "tactical hardware/snooping" aesthetic, but the prompt didn't mention it.
**Pattern:** Codify system memory constraints into agent prompts so they are respected.
## 2026-06-04 - [Accepted] - Prompt improvement - Ensure Strategist uses journals instead of PR history
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The maintainer explicitly instructed that agents must not use `git log` or past commits for memory, and instead rely on journals. The Strategist prompt was still instructing itself to review agent PR history instead of agent journals.
**Pattern:** Update prompts to ensure they align with the system constraint that cross-session memory is exclusively stored in `.jules/*.md` journal files, not git history.

## 2026-05-02 - [Accepted] - Prompt improvement - Update Sweeper prompt to enforce grep verification and fix PR title
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Sweeper journal explicitly noted that knip can hallucinate unused files that are implicitly used in configs or test runners, and that agents must use grep to verify. Additionally, system memory requires the PR title format to strictly be `🧹 [description]`.
**Pattern:** Codify system memory constraints and specific tool-verification requirements into agent prompts to avoid regressions.

## 2026-06-05 - [Accepted] - Prompt improvement - Update Sentinel to prevent flaky E2E tests and Vitest lint errors
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Sentinel's history showed recurring issues with E2E tests failing due to un-awaited IndexedDB syncs after navigation, and Vitest tests failing Biome's strict type checking (`lint/suspicious/noExplicitAny`) when creating `vi.fn()` mocks without explicit type parameters.
**Pattern:** Proposing changes to correctly configure testing tools and eliminate recurring developer friction caused by missing boundaries in agent prompts.

## 2026-06-06 - [Accepted] - New agent: TPM (Technical Program Manager)
**Type:** New agent
**Outcome:** Accepted
**Why:** System memory contains extensive rules regarding The Foundry DAG node management, orchestrator late-binding completion, circular dependencies, and archiving rules. There is a need for a dedicated agent to manage this orchestrator metadata accurately and resolve node deadlocks to prevent other agents (like Oak) from being distracted.
**Pattern:** Identifying system memory that outlines complex operational processes not covered by existing schedule prompts.

## 2026-06-06 - [Rejected] - New agent: TPM (Technical Program Manager)
**Type:** New agent
**Outcome:** Rejected → journaled
**Why:** There is already a TPM in foundry using a different scheduling mechanism.
**Pattern:** Ensure we don't duplicate existing agents/roles even if they aren't directly represented in `.jules/schedules/`. If a role exists but is missing specific instructions, we should improve its prompt rather than creating a duplicate schedule.

## 2026-06-07 - [Accepted] - Prompt improvement - Restrict Bolt to application performance
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Bolt agent's journal showed it repeatedly optimizing CI pipelines, fixing DAG orchestrator bugs, and updating tooling configs (Biome, Vite, Vitest) instead of its domain of application performance.
**Pattern:** Performance agents can easily drift into pipeline/tooling optimizations if their boundaries don't explicitly exclude infrastructure and CI/CD files.

## 2026-05-11 - [Accepted] - Prompt improvement - Prevent Shield prompt bloat
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The `shield.md` journal showed that when no code fixes were found, the agent repeatedly bloated its own prompt (`.jules/schedules/shield.md`) with exhaustive lists of generic web vulnerabilities (like "Guard against Tab-nabbing", "Guard against CSRF"). This caused the prompt to grow unmanageably and lose its focus.
**Pattern:** Do not instruct agents to expand their prompt with generic lists when they lack actionable work; instead, default to routine tasks (like `pnpm audit`) or skip execution.

## 2026-06-27 - [Accepted] - Prompt improvement - Update Canvas to require visual verification via Playwright
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Canvas prompt instructed the agent to "Include before/after screenshots in the PR description" without explaining *how* to generate them in the headless environment.
**Pattern:** Update prompts to ensure UI agents explicitly know how to run the dev server and use Python Playwright to record and capture screenshots for visual verification.

## 2026-06-28 - [Accepted] - Prompt improvement - Ensure all agents can create nodes
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Agents were incorrectly restricted or implicitly discouraged from creating dynamic nodes (like RESEARCH, IDEA, ADR) when discovering new tasks, lacking context, or uncovering architectural concerns. Scheduled agents were also not explicitly empowered to create Foundry nodes.
**Pattern:** Prompts should empower agents to spawn their own tasks (`IDEA`, `RESEARCH`, `ADR`) directly into `.foundry/` if they discover work that needs to be done.

## 2026-05-18 - [Accepted] - Prompt improvement - Standardize Empty PR Policy across all agents
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Many agents were still using the old generic text for their "Empty PR Policy", instead of pointing to the centralized knowledge base file (`.foundry/docs/knowledge_base/agents/core_policies.md`), which contains additional critical instructions (like checking off Acceptance Criteria checkboxes).
**Pattern:** Core agent policies are centralized in the knowledge base to conserve token context window, so individual prompts should reference the central document rather than duplicating incomplete rules.

## 2026-07-01 - [Accepted] - Prompt improvement - Prevent QA from failing its own validation task
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires the QA agent to not modify its own QA task's YAML frontmatter when a task's implementation fails validation. It must only update its markdown body to note the failure, while modifying the target task's frontmatter.
**Pattern:** Proposing changes to update QA agent rules to respect orchestrator constraints regarding QA node status vs target node status.

## 2026-07-05 - [Accepted] - Prompt improvement - Ignore false negatives on empty PRs
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires agents to ignore false negatives from `request_code_review` when executing the Empty PR Policy (checking off boxes). This needed to be codified in the central `core_policies.md` since agent prompts shouldn't duplicate empty PR rules.
**Pattern:** Codify memory constraints into the central knowledge base when they apply to all agents.

## 2026-07-06 - [Accepted] - Prompt improvement - Update Archivist to clean Foundry journals
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires agents to log only critical learnings, but Foundry journals (like `tpm.md`, `coder.md`, `qa.md`) were accumulating routine "I did X" entries, task verifications, and orchestrator state changes. The archivist prompt only included `.jules/*.md` and `.serena/memories/` in its scope, missing `.foundry/journals/*.md`. Adding this allows the archivist to automatically purge noisy status updates that provide no value to future runs, conserving context.
**Pattern:** Ensure cleanup/maintenance agents have scope over all relevant directories when file structures evolve (e.g. addition of `.foundry/journals/`).

## 2026-07-07 - [Accepted] - Prompt improvement - Fix TPM archiving rules to use Node IDs
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The TPM journal showed the TPM was successfully moving files but incorrectly updating YAML frontmatter `depends_on` lists and `parent` fields to point to the new `.foundry/archive/` paths. This violated the strict system constraint that these fields must only use Node IDs. The TPM prompt instructed it to update references via the 'parent' field and 'depends_on' list.
**Pattern:** Codify system memory constraints regarding Node IDs vs file paths in YAML frontmatter into the relevant agent prompts (like the TPM archiving rules) to prevent DAG orchestrator deadlocks and schema corruption.

## 2026-05-22 - [Accepted] - Prompt improvement - Ensure Architect updates schemas and respects node boundaries
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The architect's journal showed it was reprimanded for creating functional execution nodes (`EPIC`, `STORY`, `TASK`) and reminded that its role is strictly architectural blueprinting (ADRs). Furthermore, system memory dictates that when global data contracts change (e.g., ADR 010), the Architect must update `.foundry/docs/schema.md`.
**Pattern:** Codify role constraints (e.g., node creation boundaries) and secondary responsibilities (e.g., schema updates alongside ADRs) directly into agent prompts to prevent role drift and maintain system documentation.

## 2026-07-08 - [Accepted] - Prompt improvement - Read Foundry journals to assess persona prompts
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Strategist was only instructed to read `.jules/*.md` to assess agent prompt quality, missing all Foundry execution personas which log their learnings to `.foundry/journals/*.md` (e.g., coder, qa, tech_lead). This gap prevented the Strategist from identifying prompt quality issues for the most active execution agents.
**Pattern:** Update prompts to ensure they have access to the correct and complete set of journals for all personas, specifically including both `.jules/` and `.foundry/journals/` when reading logs to identify issues.

## 2026-05-24 - [Accepted] - Prompt improvement - Prevent premature Epic verification
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Auditor journal showed that Epics were transitioning to VERIFYING prematurely when their Acceptance Criteria (spawning child stories) were checked off, leading to failed audits because the actual implementation described was not merged.
**Pattern:** When an agent (like the Story Owner) is responsible for breaking down high-level nodes, it must wait for the generated execution nodes to finish before submitting its Empty PR to complete the parent node.

## 2026-07-09 - [Accepted] - Prompt improvement - Prevent TPM from logging transient status logs
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The `.foundry/journals/tpm.md` journal was filled entirely with transient status logs (e.g., 'System failure detected', 'Resurrection Loop triggered') and orchestrator state transitions, which provide no long-term value, rot the context window, and explicitly violate the memory rules for journals.
**Pattern:** Codify system memory constraints regarding journal content directly into the relevant agent's prompt, explicitly instructing them to purge and avoid logging transient status updates.
## 2026-07-11 - [Accepted] - Prompt improvement - Formalize Late Binding protocol for Coder
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The coder journal repeatedly noted that tasks lacking explicit data specifications (like memory offsets) should not be guessed, but rather suspended by spawning a RESEARCH node and dynamically injecting it into `depends_on`. However, the coder's prompt lacked explicit instructions for this late binding workflow, leading to instances where the agent didn't know how to gracefully suspend the task.
**Pattern:** When a persona discovers a critical workflow pattern for handling missing context (like Late Binding), codify the exact operational steps into their prompt so they can execute it consistently without relying solely on passive memory.

## 2026-06-21 - [Accepted] - Prompt improvement - Enforce PRD handoff to Epic Planner
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Product Manager journal observed that when generating a PRD from an IDEA, assigning the PRD's `owner_persona` back to `product_manager` breaks the downstream pipeline handoff chain. The PM prompt had a misleading pipeline string (`PRD (PM)`) and lacked a specific rule to assign ownership of PRDs to the `epic_planner`.
**Pattern:** Codify correct orchestrator handoff roles in the prompts of upstream generating agents so that newly spawned nodes are correctly routed to the downstream persona (e.g., `epic_planner`), preventing pipeline deadlocks.

## YYYY-MM-DD - [Accepted] - Prompt improvement - Prevent premature verification for all macro nodes
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Auditor journal showed that macro nodes (e.g. Epics, Stories) were transitioning to VERIFYING prematurely when their immediate Acceptance Criteria (spawning child nodes) were met, even though the actual implementation described in their requirements had not yet been merged into the codebase.
**Pattern:** When an agent (like the Epic Planner, Story Owner, or Tech Lead) is responsible for breaking down high-level nodes, it must wait for the generated execution nodes to reach COMPLETED before submitting its Empty PR to complete the parent node, ensuring the macroscopic progress representation accurately reflects implementation reality.

## 2026-07-09 - [Accepted] - Prompt improvement - Ensure QA gracefully exits cancelled tasks
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The QA journal highlighted a recurring issue where cancelled or replaced tasks reawaken in the DAG. The QA agent needs explicit instructions to check off the acceptance criteria for these nodes and submit an Empty PR so the node gracefully transitions to COMPLETED.
**Pattern:** When an execution node must gracefully exit the DAG despite no implementation being completed (like replaced or cancelled tasks), the agent responsible MUST check off the markdown Acceptance Criteria boxes so the node can safely pass validation under ADR 007.
## 2026-07-09 - [Accepted] - Prompt improvement - Ensure Tech Lead checks unchecked checkboxes for empty PRs
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Tech Lead was missing the explicit instruction about checking unchecked Acceptance Criteria checkboxes when submitting an empty PR, which is present in other persona prompts and required by ADR 007 and ADR 009.
**Pattern:** Codify system memory constraints into agent prompts to avoid regressions and ensure consistency across personas.

## 2026-06-04 - [Accepted] - Prompt improvement - Ensure QA agent increments rejection_count when rejecting an implementation
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** System memory requires the QA agent to increment the `rejection_count` in the target task's YAML frontmatter when it rejects an implementation task, but this instruction was missing from the QA agent's prompt. The `rejection_count` is critical for tracking chronic failure areas (e.g. for the Permanent Failure Dashboard - ADR 017).
**Pattern:** Codify missing system memory constraints about updating specific schema fields (like `rejection_count`) directly into the responsible agent's prompt to ensure compliance and data integrity.
## 2026-07-09 - [Accepted] - Prompt improvement - Prevent premature verification for macro nodes
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Auditor journal showed that macro nodes (e.g. Epics, Stories) were transitioning to VERIFYING prematurely when their immediate Acceptance Criteria (spawning child nodes) were met, even though the actual implementation described in their requirements had not yet been merged into the codebase.
**Pattern:** When an agent (like the Epic Planner, Story Owner, or Tech Lead) is responsible for breaking down high-level nodes, it must append newly generated child nodes as unchecked tasks (`- [ ]`) to its markdown body, so that the parent node correctly waits for the generated execution nodes to reach COMPLETED before it can be submitted via an Empty PR.
## 2026-06-02 - [Accepted] - Prompt improvement - Prevent premature verification for Product Manager and Auditor
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Auditor journal showed that macro nodes (e.g. PRDs) were transitioning to VERIFYING prematurely when their immediate Acceptance Criteria (spawning child nodes) were met, leading to false progress signaling. Product Manager missed this explicit rule which the other planners already had. Auditor also needed explicit instructions to enforce this constraint.
**Pattern:** Ensure all persona prompts involved in macroscopic planning (IDEA, PRD, EPIC, STORY) and auditing explicitly enforce the dependency graph constraint that a parent node must wait for all child execution nodes to finish before it can transition to VERIFYING or COMPLETED.

## 2026-06-07 - [Accepted] - Prompt improvement - Ensure QA checks off acceptance criteria for reawakened tasks
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The QA journal identified an issue where cancelled or replaced tasks reawaken in the DAG because their previous dependency finished triggering the Empty PR flow. The QA agent needs explicit instructions to check off the acceptance criteria for these nodes and submit an Empty PR so the node gracefully exits the DAG to COMPLETED.
**Pattern:** When an execution node must gracefully exit the DAG despite no real work being needed (like replaced or cancelled tasks), the agent responsible MUST check off the markdown Acceptance Criteria boxes so the node can safely pass validation under ADR 007.
## 2026-07-10 - [Accepted] - Prompt improvement - Prevent Auditor from modifying YAML frontmatter
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The memory requires that when the Auditor persona fails a node verification, it must not modify the YAML frontmatter to set `status: FAILED`. Instead, it must uncheck the relevant Acceptance Criteria box and append an `### Auditor Rejection` section in the markdown body explaining the failure.
**Pattern:** Ensure agent prompts respect the CRITICAL RULE against modifying node YAML when verifying implementations.
## 2026-07-10 - [Accepted] - Prompt improvement - Require Strategist to read core policies and ADRs
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Strategist's own prompt lacked instructions to read the centralized `.foundry/docs/knowledge_base/agents/core_policies.md` and `.foundry/docs/adrs/` documents. Without this context, the Strategist could not effectively assess if other agents were violating core policies, and risked proposing duplicate or conflicting rules that were already centralized.
**Pattern:** Ensure meta-agents that evaluate and modify prompts have explicit instructions to read centralized policy and architecture documents so they understand the system's baseline constraints.
## 2026-06-09 - [Accepted] - Prompt improvement - Enforce unchecked checkboxes for child nodes in Product Manager
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `product_manager.md` journal recorded that when converting IDEA nodes to PRDs, the generated child PRDs were sometimes added as plain text instead of unchecked checkboxes (`- [ ]`). This caused the Orchestrator to assume the parent node had met all its acceptance criteria, prematurely transitioning it to VERIFYING before descendant nodes were actually completed, which led to rejections and violated the DAG constraints.
**Pattern:** Codify strict orchestrator-level syntax constraints (like using unchecked task checkboxes for child nodes in generation nodes) directly into the agent's prompt to prevent premature verification bugs and DAG desyncs.

## 2026-07-10 - [Accepted] - Prompt improvement - Enforce Node ID strictness for planners
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The coder journal highlighted a regression (`2026-05-31: Foundry DAG ID Strictness`) where using `.md` extensions or full file paths in the `depends_on` or `parent` fields causes the orchestrator to fail to resolve the dependency graph. The TPM agent prompt already had a rule for Node IDs, but the agents responsible for creating the nodes initially (Product Manager, Epic Planner, Story Owner, Tech Lead) were not explicitly warned.
**Pattern:** When a critical schema constraint is identified (like Node IDs vs file paths in frontmatter), codify it across all relevant upstream generative personas, not just the downstream maintenance ones, to prevent the issue at the source.

## 2026-06-10 - [Accepted] - Prompt improvement - Require Coder to read rejection reasons for failed tasks
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** To prevent impossible loops, implementation agents must not ignore rejection reasons when resurrecting failed tasks.
**Pattern:** Explicitly instruct implementation agents (like the Coder) to read the `rejection_reason` and the QA journal when resuming a previously failed task to ensure they fix the actual problem rather than blindly resubmitting.

## 2026-06-11 - [Accepted] - Prompt improvement - Prevent planner blind resubmission
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Auditor journal observed that failed macro nodes (e.g., IDEA, PRD) in the Resurrection Loop were being blindly resubmitted by the planners without addressing the rejection reasons. This led to infinite loops. Planners previously lacked the explicit instructions that implementation agents (like Coder) had for resuming FAILED nodes.
**Pattern:** Ensure all upstream generating personas (Product Manager, Epic Planner, Story Owner, Tech Lead) have explicit instructions to read the `rejection_reason` and the reviewing persona's journal (Auditor or QA) when assigned a resurrected FAILED node, to fix the actual issue instead of blindly resubmitting.
## 2026-07-15 - [Accepted] - Prompt improvement - Add Late Binding protocol to Tech Lead
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `coder` persona already utilizes the Late Binding pattern to gracefully suspend tasks when missing critical context (like memory offsets) by spawning a RESEARCH node and adding it to `depends_on`. The `tech_lead` persona often faces the exact same issue when attempting to translate a vague STORY into actionable technical TASK blueprints. Without explicit Late Binding instructions, the Tech Lead might hallucinate data or write impossible tasks instead of suspending the parent story pending proper research.
**Pattern:** Apply successful operational patterns (like Late Binding) universally across all relevant personas in the pipeline (from planning to implementation) to ensure consistent error handling and context discovery without hallucination.

## 2026-06-11 - [Accepted] - Prompt improvement - Add Scratchpad Cleanup rule
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Tech Lead journal ("2026-06-10") observed that temporary scratchpad scripts (like generate_reads.sh) left in the workspace pollute the repository and cause code review rejections.
**Pattern:** Ensure all agents are explicitly instructed to clean up any temporary scripts or scratchpads they create before submitting their work to prevent repository pollution and PR rejections.

## 2026-06-14 - [Accepted] - Prompt improvement - Standardize permanent failure handling across all agents
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Agile Coach journal (`2026-06-14`) identified that the instructions for handling permanent failures (like reaching max rejection count) were inconsistent across the different agent personas. Some agents (like `coder` and `qa`) were instructed to use `CANCELLED` and explicitly warned not to use `FAILED` because it prevents the Orchestrator from formally dropping the node and waking up the parent for error recovery. Other agents (like `architect`, `epic_planner`, `product_manager`, `researcher`, `story_owner`, and `tech_lead`) were incorrectly instructed to use either `FAILED` or `CANCELLED`.
**Pattern:** Codify system memory constraints regarding permanent node failures across all relevant agent prompts to ensure consistent error recovery behavior across the entire DAG hierarchy. When an execution node must gracefully exit the DAG because it is permanently failed or replaced, the agent responsible MUST update its status to `CANCELLED`, not `FAILED`.

## 2026-07-12 - [Accepted] - Prompt improvement - Ensure Canvas uses frontend_verification_instructions tool
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Canvas prompt instructed the agent to manually write Playwright scripts, but the system now provides the `frontend_verification_instructions` tool which provides exact, up-to-date headless environment instructions.
**Pattern:** UI agents must explicitly use the `frontend_verification_instructions` tool instead of guessing Playwright setups in headless environments.
## 2026-06-17 - [Accepted] - Prompt improvement - Enforce Permanent Child Failure Protocol for Tech Lead
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The memory requires appending an '### Auditor Rejection' section to orphaned QA tasks during a permanent child failure to properly cancel it, which the Tech Lead prompt lacked.
**Pattern:** Codify system memory constraints regarding permanent node failures across all relevant agent prompts to ensure consistent error recovery behavior across the entire DAG hierarchy.

## 2026-06-18 - [Accepted] - Prompt improvement - Ensure Strategist checks unchecked checkboxes for empty PRs
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Strategist prompt was missing the explicit instruction about checking unchecked Acceptance Criteria checkboxes when submitting an empty PR, which is present in other persona prompts and required by ADR 007 and ADR 009.
**Pattern:** Codify system memory constraints into agent prompts to avoid regressions and ensure consistency across personas.

## 2026-06-20 - [Accepted] - Prompt improvement - Prevent magic numbers in save file parsing
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Auditor journal noted that using inline magic numbers for save file parsing offsets leads to brittle code. The `tech_lead`, `coder`, and `qa` agents lacked explicit instructions to prevent this.
**Pattern:** Ensure agents involved in save file parsing explicitly define and enforce the use of reusable constants for memory offsets, lengths, and bit locations at the module level instead of using inline magic numbers.

## 2026-07-13 - [Accepted] - Prompt improvement - Enforce Exploration Rule and Scratchpad Cleanup
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The memory requires that context gathering is done using the `read_file` tool rather than bash scripts/`cat` to avoid truncation. Several agent prompts (qa, auditor, researcher, strategist) lacked this explicit `CRITICAL CONTEXT GATHERING INSTRUCTION`. Additionally, the Strategist prompt lacked the `Scratchpad Cleanup` section to prevent repository pollution.
**Pattern:** Apply systemic rules consistently across all relevant agent personas. When an architectural constraint or tool rule applies to exploration or repository hygiene, it must be explicitly included in all agent prompts to ensure compliance.

## 2026-07-14 - [Accepted] - Prompt improvement - Relax QA task pairing enforcement for Auditor
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The Auditor journal noted that the coder is always responsible for writing tests, and for simple tasks, the Tech Lead can bypass creating a dedicated QA task. The Auditor agent must not falsely reject macro nodes due to missing QA tasks if the Tech Lead deemed them unnecessary.
**Pattern:** Codify system memory constraints into agent prompts to avoid false-positive rejections. Do not strictly enforce QA task pairing for every single implementation task if the Tech Lead has deemed the complexity low enough.
## 2026-06-21 - [Rejected] - Prompt improvement - Correct Late Binding status transition for Coder
**Type:** Prompt improvement
**Outcome:** Rejected → journaled
**Why:** Modifying the `coder.md` prompt to submit an Empty PR for late-binding dependencies created a severe logical contradiction. If the agent modifies the node file's YAML to add the new dependency, committing those changes means the PR is *not* empty. Conversely, if it strictly submits an empty PR, the dependency changes are discarded, breaking the late binding pattern entirely. Additionally, it instructed the agent *not* to change the status to `FAILED`, which violated the "Core Policies" restricting YAML modifications *only* to `FAILED` or `CANCELLED` statuses. The proposed workflow for the Coder agent was impossible.
**Pattern:** Do not propose prompt changes that create logical paradoxes or impossible workflows, such as requiring an "Empty PR" for a step that inherently requires file modifications (like updating a `depends_on` array).

## 2026-07-16 - [Accepted] - Prompt improvement - Enforce checkbox checking for failed child nodes
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The journals for several planner personas (`story_owner`, `tech_lead`) noted that when handling a permanent child node failure, the parent node's markdown checkbox for the failed child node must be checked off (`- [x]`) so that the parent can eventually be marked COMPLETED and pass the ADR 007 validation. If left unchecked, the parent node will be permanently stuck in the PENDING state. This explicit instruction was missing from the "HANDLING PERMANENT CHILD FAILURES" section in the prompts for all generative personas (`product_manager`, `epic_planner`, `story_owner`, `tech_lead`).
**Pattern:** Codify system constraints discovered by implementation agents (ADR 007 checklist compliance for failed/cancelled child nodes) explicitly into the prompts of the generative upstream agents to avoid task freezing or endless parent node PENDING loops.
