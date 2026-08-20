## 2026-08-02 - [Accepted] - Retire agile_coach persona
**Type:** Retirement
**Outcome:** Merged
**Why:** The responsibilities of the `agile_coach` persona (improving personas, consolidating redundancy, identifying friction, analyzing history) are completely duplicated by the `strategist` and `mechanic` personas. Retiring it reduces system overhead and removes redundant meta-agents.
**Pattern:** Retire agents that overlap completely with other personas to keep the roster focused.

## 2026-08-03 - [Accepted] - Prompt improvement - Plan Review Citation Rule
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Agents were using `request_plan_review` with business logic, formulas, or constants in their plans, but were not citing where those requirements came from (e.g., `.foundry/docs/...`). Reviewers, without context of the project documents, were incorrectly rejecting these correct plans as AI "hallucinations".
**Pattern:** Codify system memory constraints into `core_policies.md` to prevent plan reviewers from incorrectly rejecting valid execution plans, by mandating explicit file path citations for business logic to prove groundedness.

## 2026-08-15 - [Accepted] - Prompt Consolidation: Centralize Save File Parsing Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules for save file parsing (avoiding magic numbers, using relative offsets for Gen 3, catching RangeError, and mapping bitwise offsets) were duplicated across `coder.md`, `tech_lead.md`, and `qa.md`. This verbosity wastes context window tokens and creates a maintenance burden if the rules change.
**Pattern:** Consolidate redundant architectural or implementation rules from agent prompts into centralized sections in `.foundry/docs/schema.md` (or other core docs) and have the agent prompts reference them. This enforces a single source of truth and reduces token usage.

## 2026-08-20 - [Accepted] - Prompt Consolidation: Node Generation Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules regarding node decomposition (e.g., breaking down PRDs, Epics, Stories) and late binding were duplicated across multiple generative persona prompts (`product_manager.md`, `epic_planner.md`, `story_owner.md`, `tech_lead.md`). The "Two-Tasks-Max" anti-pattern was also explicitly listed in `tech_lead.md` but is a general principle. Since these rules are globally defined in `core_policies.md` under "Mandate Decomposition, Granularity, and Late Binding" and "Avoid the 'Two-Tasks-Max' Anti-pattern", maintaining them in individual prompts wastes context tokens and creates a risk of divergence.
**Pattern:** Consolidate duplicated architectural or execution principles from individual agent prompts into centralized core documents (e.g., `core_policies.md`) to enforce a single source of truth and reduce prompt size.

## 2026-08-25 - [Accepted] - Remove prompt improvement from mechanic persona
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The responsibilities of the `mechanic` persona included updating persona prompts ("Improve Personas"), which is exactly duplicated by the `strategist` persona's primary directive. Removing this from `mechanic` eliminates redundancy and centralizes prompt engineering to the `strategist`.
**Pattern:** Remove overlapping directives between daily and weekly meta-agents to ensure clear separation of concerns.

## 2026-08-30 - [Accepted] - Retire mechanic persona
**Type:** Retirement
**Outcome:** Merged
**Why:** The `mechanic` persona's remaining responsibilities are completely redundant. Resolving DAG deadlocks and orchestrator issues is handled by the `tpm` (hourly), and proactively proposing system improvements (IDEA nodes) for the Foundry orchestrator is explicitly handled by the `visionary` (which maintains a 50/50 split between DexHelper and Foundry ideas). Its previous prompt-improvement duties were already moved to `strategist`. Removing it reduces overhead and eliminates overlapping meta-agents.
**Pattern:** Retire agents whose responsibilities have been fully absorbed by more specialized personas to keep the roster lean and prevent conflicting actions.

## YYYY-MM-DD-HH-MM-SS - [Accepted] - Prompt improvement - Centralize E2E Orchestrator Safeguard
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The `epic_planner` prompt had an explicit rule to generate E2E verification stories for every Epic. However, `story_owner` (who dynamically generates stories for Epics) lacked this instruction. Because of the orchestrator safeguard, Epics handled by `story_owner` were stalling and failing.
**Pattern:** Move critical orchestrator safeguard generation rules (like E2E requirements) out of individual generative prompts (`epic_planner`) and into the "Node Generation Rules" section of `core_policies.md` so that all generative personas (`story_owner`, etc.) enforce them uniformly.

## 2026-08-05 - [Accepted] - Prompt improvement - Centralize architectural and verification constraints
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Several personas (Coder, QA, Tech Lead, Auditor) shared duplicated constraints around Save File Parsing (Section 13), UI Aesthetics (ADR 008), Architectural Scaffolding, Vitest mocks, and the Intelligent Verification Protocol. This leads to drift and bloated context windows.
**Pattern:** Extract duplicated coding and verification policies from individual agent schedules and centralize them into `core_policies.md` to ensure all agents operate from a single, consistent source of truth, reducing token usage and simplifying prompt maintenance.
