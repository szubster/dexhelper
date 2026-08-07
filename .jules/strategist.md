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
