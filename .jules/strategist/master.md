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
