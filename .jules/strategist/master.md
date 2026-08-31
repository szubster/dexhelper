

---

## 2024-08-30 - Accepted - Update Aggregated Journal Paths
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The instructions in `strategist.md` told the agent to read directories like `.jules/*/*.md` and `.foundry/journals/*/*.md`. However, since the Archivist persona aggregates session logs into singular markdown files per persona (e.g., `.jules/bolt.md`, `.foundry/journals/coder.md`), the Strategist was unable to read the files effectively and failed during journal review phases.
**Pattern:** Ensure file path instructions in prompts reflect the actual repository structure, especially taking into account Archivist aggregations.
