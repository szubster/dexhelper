## 2026-08-20 - [Accepted] - Prompt Consolidation: Node Generation Rules
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The rules regarding node decomposition (e.g., breaking down PRDs, Epics, Stories) and late binding were duplicated across multiple generative persona prompts (`product_manager.md`, `epic_planner.md`, `story_owner.md`, `tech_lead.md`). The "Two-Tasks-Max" anti-pattern was also explicitly listed in `tech_lead.md` but is a general principle. Since these rules are globally defined in `core_policies.md` under "Mandate Decomposition, Granularity, and Late Binding" and "Avoid the 'Two-Tasks-Max' Anti-pattern", maintaining them in individual prompts wastes context tokens and creates a risk of divergence.
**Pattern:** Consolidate duplicated architectural or execution principles from individual agent prompts into centralized core documents (e.g., `core_policies.md`) to enforce a single source of truth and reduce prompt size.
