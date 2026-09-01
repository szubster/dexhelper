## 2026-08-01 - [Accepted] - Prompt Consolidation: Centralize Context Initialization Rules
**Type:** Prompt improvement
**Why:** The rules for mandatory context initialization (reading `.foundry/docs/`, `.foundry/docs/knowledge_base/`, and `.foundry/archive/docs/adrs/`, and following ADR 001) were duplicated across many agent prompts (`coder`, `researcher`, `auditor`, `tpm`, `qa`, `product_manager`, `story_owner`, `tech_lead`, `epic_planner`, `architect`). This verbosity wastes context window tokens and creates a maintenance burden if the rules change.
**Pattern:** Consolidate redundant initialization instructions from agent prompts into centralized sections in `core_policies.md` to enforce a single source of truth and reduce prompt size.

## 2026-08-02 - [Accepted] - Prompt improvement: Include .jules/ directory in TPM journal management
**Type:** Prompt improvement
**Why:** The `tpm` (Technical Program Manager) agent runs hourly and is responsible for managing journals, archiving stale content to prevent directory bloat, and aggregating learnings into master logs. However, the `tpm.md` prompt explicitly instructed it to *only* clean the `.foundry/journals/` directory. Many personas (e.g., `strategist`, `canvas`, `shield`, `infras`, `sweeper`, etc.) store their private journals in the `.jules/` directory instead of `.foundry/journals/`. Because of this omission, `.jules/` was an uncovered concern and would grow unmanaged with session-unique markdown files over time. Including `.jules/` alongside `.foundry/journals/` in the "Manage Journals" directive ensures all agent journals are properly cleaned and aggregated.
**Pattern:** Ensure global cleanup directives account for all relevant directories, especially when architectural standards (like journal locations) span multiple top-level directories (`.jules/` and `.foundry/journals/`).

## 2026-08-02 - [Accepted] - Retire agile_coach persona
**Type:** Retirement
**Why:** The responsibilities of the `agile_coach` persona (improving personas, consolidating redundancy, identifying friction, analyzing history) are completely duplicated by the `strategist` and `mechanic` personas. Retiring it reduces system overhead and removes redundant meta-agents.
**Pattern:** Retire agents that overlap completely with other personas to keep the roster focused.

## 2026-08-03 - [Accepted] - Prompt improvement - Plan Review Citation Rule
**Type:** Prompt improvement
**Why:** Agents were using `request_plan_review` with business logic, formulas, or constants in their plans, but were not citing where those requirements came from (e.g., `.foundry/docs/...`). Reviewers, without context of the project documents, were incorrectly rejecting these correct plans as AI "hallucinations".
**Pattern:** Codify system memory constraints into `core_policies.md` to prevent plan reviewers from incorrectly rejecting valid execution plans, by mandating explicit file path citations for business logic to prove groundedness.

## 2026-08-15 - [Accepted] - Prompt Consolidation: Centralize Save File Parsing Rules
**Type:** Prompt improvement
**Why:** The rules for save file parsing (avoiding magic numbers, using relative offsets for Gen 3, catching RangeError, and mapping bitwise offsets) were duplicated across `coder.md`, `tech_lead.md`, and `qa.md`. This verbosity wastes context window tokens and creates a maintenance burden if the rules change.
**Pattern:** Consolidate redundant architectural or implementation rules from agent prompts into centralized sections in `.foundry/docs/schema.md` (or other core docs) and have the agent prompts reference them. This enforces a single source of truth and reduces token usage.

## 2026-08-20 - [Accepted] - Prompt Consolidation: Node Generation Rules
**Type:** Prompt improvement
**Why:** The rules regarding node decomposition (e.g., breaking down PRDs, Epics, Stories) and late binding were duplicated across multiple generative persona prompts (`product_manager.md`, `epic_planner.md`, `story_owner.md`, `tech_lead.md`). The "Two-Tasks-Max" anti-pattern was also explicitly listed in `tech_lead.md` but is a general principle. Since these rules are globally defined in `core_policies.md` under "Mandate Decomposition, Granularity, and Late Binding" and "Avoid the 'Two-Tasks-Max' Anti-pattern", maintaining them in individual prompts wastes context tokens and creates a risk of divergence.
**Pattern:** Consolidate duplicated architectural or execution principles from individual agent prompts into centralized core documents (e.g., `core_policies.md`) to enforce a single source of truth and reduce prompt size.

## 2026-08-25 - [Accepted] - Remove prompt improvement from mechanic persona
**Type:** Prompt improvement
**Why:** The responsibilities of the `mechanic` persona included updating persona prompts ("Improve Personas"), which is exactly duplicated by the `strategist` persona's primary directive. Removing this from `mechanic` eliminates redundancy and centralizes prompt engineering to the `strategist`.
**Pattern:** Remove overlapping directives between daily and weekly meta-agents to ensure clear separation of concerns.

## 2026-08-30 - [Accepted] - Retire mechanic persona
**Type:** Retirement
**Why:** The `mechanic` persona's remaining responsibilities are completely redundant. Resolving DAG deadlocks and orchestrator issues is handled by the `tpm` (hourly), and proactively proposing system improvements (IDEA nodes) for the Foundry orchestrator is explicitly handled by the `visionary` (which maintains a 50/50 split between DexHelper and Foundry ideas). Its previous prompt-improvement duties were already moved to `strategist`. Removing it reduces overhead and eliminates overlapping meta-agents.
**Pattern:** Retire agents whose responsibilities have been fully absorbed by more specialized personas to keep the roster lean and prevent conflicting actions.


## Session from 2026-08-06-04-18-00.md
## 2026-08-06 - [Accepted] - Prompt improvement - Cleanup retired personas and centralized policies
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `product_manager` schedule had a reference to the `Agile Coach` persona which has been retired. The `epic_planner` schedule had duplicated `Integration Rule` and `Integration Requirement` directives which have been centralized to `core_policies.md`.
**Pattern:** Regularly scrub agent schedules to remove references to retired personas and eliminate duplicate directives that are centralized in `core_policies.md` to keep prompts concise.


## 2026-08-01 - [Accepted] - Prompt Consolidation: Centralize Context Initialization Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for mandatory context initialization (reading `.foundry/docs/`, `.foundry/docs/knowledge_base/`, and `.foundry/archive/docs/adrs/`, and following ADR 001) were duplicated across many agent prompts (`coder`, `researcher`, `auditor`, `tpm`, `qa`, `product_manager`, `story_owner`, `tech_lead`, `epic_planner`, `architect`). This verbosity wastes context window tokens and creates a maintenance burden if the rules change.
**Pattern:** Consolidate redundant initialization instructions from agent prompts into centralized sections in `core_policies.md` to enforce a single source of truth and reduce prompt size.

## 2026-08-02 - [Accepted] - Prompt improvement: Include .jules/ directory in TPM journal management
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `tpm` (Technical Program Manager) agent runs hourly and is responsible for managing journals, archiving stale content to prevent directory bloat, and aggregating learnings into master logs. However, the `tpm.md` prompt explicitly instructed it to *only* clean the `.foundry/journals/` directory. Many personas (e.g., `strategist`, `canvas`, `shield`, `infras`, `sweeper`, etc.) store their private journals in the `.jules/` directory instead of `.foundry/journals/`. Because of this omission, `.jules/` was an uncovered concern and would grow unmanaged with session-unique markdown files over time. Including `.jules/` alongside `.foundry/journals/` in the "Manage Journals" directive ensures all agent journals are properly cleaned and aggregated.
**Pattern:** Ensure global cleanup directives account for all relevant directories, especially when architectural standards (like journal locations) span multiple top-level directories (`.jules/` and `.foundry/journals/`).

## 2026-08-06 - [Accepted] - Prompt improvement - Cleanup retired personas and centralized policies
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `product_manager` schedule had a reference to the `Agile Coach` persona which has been retired. The `epic_planner` schedule had duplicated `Integration Rule` and `Integration Requirement` directives which have been centralized to `core_policies.md`.
**Pattern:** Regularly scrub agent schedules to remove references to retired personas and eliminate duplicate directives that are centralized in `core_policies.md` to keep prompts concise.

## 2026-08-07 - [Accepted] - Prompt improvement - Centralize Cancelled/Replaced Tasks Handling
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for dealing with permanent failures, cancelled tasks, and reawakening are general orchestrator behaviors that apply not just to the QA agent or Auditor, but theoretically to any verification node in the DAG. Repeating these deeply nuanced state transition rules in specific schedules (`qa.md`, `auditor.md`) invites drift and bloats the prompt context.
**Pattern:** Extract complex, DAG-level state transition rules from individual persona prompts (like QA and Auditor) and centralize them in `core_policies.md` so that all agents act uniformly and context windows remain lean.

## 2026-08-09 - [Accepted] - Prompt improvement - Centralize core policy read requirements and journal instructions
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `foundry-orchestrator.ts` already automatically appends the contents of `.foundry/docs/knowledge_base/agents/core_policies.md` to every agent prompt via the `compiled_prompt` field. Therefore, instructing agents inside their markdown files to "read" that file manually is redundant and a waste of tokens. Additionally, the exact journaling instructions (e.g., explaining why memory shouldn't be used as a ledger) were duplicated across many agent prompts (`canvas`, `strategist`, etc.).
**Pattern:** Ensure duplicated text and redundant read commands are centralized in `core_policies.md` or removed entirely when handled by orchestrator automation, preserving maximum context window space for the actual tasks.

## 2026-08-10 - [Accepted] - Prompt improvement - Centralize Transient Rejections
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `qa.md` schedule contained specific instructions for failing a node (transient rejection), which are universally applicable to any verification agent (QA, Auditor). The `auditor.md` schedule contained contradictory instructions (falsely claiming modifying node YAML to set status to FAILED was forbidden).
**Pattern:** Extracted the "Handling Rejections" step-by-step logic from `qa.md` and centralized it as "Triggering Transient Rejections" in `core_policies.md`. Updated `qa.md` and `auditor.md` to reference this single source of truth, resolving the contradiction and standardizing agent behavior.

## YYYY-MM-DD-HH-MM-SS - [Accepted] - Prompt improvement - Centralize E2E Orchestrator Safeguard
**Type:** Prompt improvement
**Why:** The `epic_planner` prompt had an explicit rule to generate E2E verification stories for every Epic. However, `story_owner` (who dynamically generates stories for Epics) lacked this instruction. Because of the orchestrator safeguard, Epics handled by `story_owner` were stalling and failing.
**Pattern:** Move critical orchestrator safeguard generation rules (like E2E requirements) out of individual generative prompts (`epic_planner`) and into the "Node Generation Rules" section of `core_policies.md` so that all generative personas (`story_owner`, etc.) enforce them uniformly.

## 2026-08-05 - [Accepted] - Prompt improvement - Centralize architectural and verification constraints
**Type:** Prompt improvement
**Why:** Several personas (Coder, QA, Tech Lead, Auditor) shared duplicated constraints around Save File Parsing (Section 13), UI Aesthetics (ADR 008), Architectural Scaffolding, Vitest mocks, and the Intelligent Verification Protocol. This leads to drift and bloated context windows.
**Pattern:** Extract duplicated coding and verification policies from individual agent schedules and centralize them into `core_policies.md` to ensure all agents operate from a single, consistent source of truth, reducing token usage and simplifying prompt maintenance.

## 2026-08-13 - [Accepted] - Prompt improvement - Clean up Epic Planner rules handled in core_policies
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `epic_planner.md` schedule still contained the "E2E Verification" generation rule which had already been migrated to `core_policies.md` under "Orchestrator Safeguard". We need to remove the duplicate rule from `epic_planner.md` to prevent prompt bloat and reduce redundancy. Also, deleted the `epic-planner-instructions.test.ts` as the E2E verification rule is now universally enforced in `core_policies.md` and no longer needs a specific check in `epic_planner.md`.
**Pattern:** Always check and verify that older tests checking for prompt specific rules are also cleaned up when a rule is migrated to a central file like `core_policies.md`.

## 2026-08-15 - [Accepted] - Prompt improvement - Cleanup redundant context initialization in Tech Lead and Architect schedules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for mandatory context initialization (reading `.foundry/docs/`, `.foundry/docs/knowledge_base/`, and `.foundry/archive/docs/adrs/`) were consolidated into `core_policies.md` on 2026-08-01. However, `.github/agents/tech_lead.md` and `.github/agents/architect.md` still contained redundant `Workflow` steps explicitly instructing the persona to review this documentation manually. This wastes context window space and creates inconsistency.
**Pattern:** Regularly scrub agent schedules to remove directives that are already enforced globally in `.foundry/docs/knowledge_base/agents/core_policies.md`.

## 2026-08-18 - [Accepted] - Prompt improvement: Add Journal section to Changelogger
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `changelogger.md` schedule was completely missing the standard "Journal" section and its associated directives. Because of this omission, the Changelogger agent lacked strict instructions on where to save its private journal (`.foundry/journals/changelogger/`) and an explicit requirement to adhere to the core journaling policies defined in `.foundry/docs/knowledge_base/agents/core_policies.md`. The journal section is standard across all other agent prompts and is necessary for long term learning and debugging.
**Pattern:** Ensure all agent prompts contain the required "Journal" section specifying the correct journal location and mandating adherence to the `core_policies.md` rules to maintain consistency across the agent roster.


## 2026-08-21 - [Accepted] - Prompt Consolidation: Remove Redundant Handling Rejections Section
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** The rules for triggering transient rejections are already centralized in `core_policies.md`, which is automatically appended to all agent prompts by the orchestrator. Explicitly reiterating that QA should follow the "Triggering Transient Rejections" protocol in `qa.md` is redundant and wastes context window tokens.
**Pattern:** Remove explicitly referenced sections to `core_policies.md` from agent prompts if the orchestrator automatically appends `core_policies.md` to them.

## 2026-08-22 - [Accepted] - Prompt improvement - Clean up redundant context initialization in Agile Coach schedule
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for mandatory context initialization (reading `.foundry/docs/`, `.foundry/docs/knowledge_base/`, and `.foundry/archive/docs/adrs/`) were consolidated into `core_policies.md` on 2026-08-01. The orchestrator automatically appends `.foundry/docs/knowledge_base/agents/core_policies.md` to every agent prompt via the `compiled_prompt` field. However, `.github/agents/agile_coach.md` still contained redundant `Core Directives`, `Workflow` steps, and `Core Policies` sections explicitly instructing the persona to review this documentation manually. This wastes context window space and creates inconsistency.
**Pattern:** Regularly scrub agent schedules to remove directives that are already enforced globally in `.foundry/docs/knowledge_base/agents/core_policies.md`.


## 2026-08-25 - [Accepted] - Prompt improvement - Clean up redundant Directives in Story Owner schedule
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The instructions for "Autonomous Execution" and "E2E Testing Scope" in the "Directives" section of `.github/agents/story_owner.md` were redundant because they are already centrally defined and enforced for all agents in `.foundry/docs/knowledge_base/agents/core_policies.md`.
**Pattern:** Scrub agent schedules to remove directives that are already centralized globally in `core_policies.md` to reduce prompt bloat.

<!-- Merged from 2026-08-26-02-00-00.md -->
## 2026-08-26 - [Accepted] - Prompt improvement: Standardize Journal sections for Coder, PM, and QA
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The schedules for `coder`, `product_manager`, and `qa` were missing the standard journal instructions, lacking a requirement to adhere to the core journaling policies defined in `core_policies.md`. This was leading to non-compliant journaling behavior for these personas. Adding the standard paragraph ensures all agent prompts are consistent.
**Pattern:** Ensure all agent prompts contain the required 'Journal' section specifying the correct journal location and mandating adherence to the `core_policies.md` rules to maintain consistency across the agent roster.



---

## 2024-08-30 - Accepted - Update Aggregated Journal Paths
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The instructions in `strategist.md` told the agent to read directories like `.jules/*/*.md` and `.foundry/journals/*/*.md`. However, since the Archivist persona aggregates session logs into singular markdown files per persona (e.g., `.jules/bolt.md`, `.foundry/journals/coder.md`), the Strategist was unable to read the files effectively and failed during journal review phases.
**Pattern:** Ensure file path instructions in prompts reflect the actual repository structure, especially taking into account Archivist aggregations.

## 2024-08-31 - Accepted - Align Write Paths with Aggregated Journal Paths
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** While the read paths were updated in a previous PR to read aggregated `.jules/<persona>.md` files, the write paths were left pointing to the old directory structure (`.jules/<persona>/<session_id>.md`). This broke the memory system because agents were saving session logs into directories they no longer read on subsequent runs, rendering their long-term memory useless.
**Pattern:** When modifying the journaling read paths (e.g. from a wildcard directory to a single file), you MUST also align the write instructions so agents persist their entries into the same aggregated file they read from, preserving the learning loop.
