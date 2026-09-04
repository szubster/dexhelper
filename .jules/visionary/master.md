

---

# Visionary Journal - Session 2026-08-25-01-54-00

## Session Overview
- Date: 2026-08-25
- Task: Proposed IDEA node `idea-422-gen3-pokeblock-recipe-optimizer` for calculating optimal berry blends.

## Critical Learnings & Strategic Insights
- **Domain:** Main Project (DexHelper)
- **Rationale & Concept:** Calculates optimal Pokéblock recipes to reach contest condition goals (e.g. Milotic beauty) based on the user's active berry inventory, preventing permanent save file bricking due to the hidden 'Feel' limit.
- **Strategic Balance:** In the previous session, IDEA-421 (Automated Markdown Schema Validation) was proposed for the Foundry System infrastructure. To strictly maintain the required 50/50 balance between product features and system improvements, this session pivots back to a high-value product feature for DexHelper.


---

# Visionary Journal

* **System Pattern Observation**: I originally proposed an idea for a DAG Dry-Run Simulator, but the maintainer pointed out that the orchestrator already supports a `--dry-run` flag which is run in CI. This is a critical lesson: always thoroughly check existing scripts and CI workflows (`.github/workflows/ci.yml`, `.github/scripts/`) before proposing "new" Foundry tools to avoid redundancy.
* **Idea Generation Strategy**: Pivot back to the main project (DexHelper). There is currently no unified visualization for Gen 3 roamer locations, berry patches, and player location on the Hoenn map. I will propose an Interactive Map UI.
