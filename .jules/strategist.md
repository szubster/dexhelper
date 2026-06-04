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
## 2026-06-02 - [Accepted] - Prompt improvement - Prevent premature verification for Product Manager and Auditor
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The Auditor journal showed that macro nodes (e.g. PRDs) were transitioning to VERIFYING prematurely when their immediate Acceptance Criteria (spawning child nodes) were met, leading to false progress signaling. Product Manager missed this explicit rule which the other planners already had. Auditor also needed explicit instructions to enforce this constraint.
**Pattern:** Ensure all persona prompts involved in macroscopic planning (IDEA, PRD, EPIC, STORY) and auditing explicitly enforce the dependency graph constraint that a parent node must wait for all child execution nodes to finish before it can transition to VERIFYING or COMPLETED.
