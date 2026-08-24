# Agile_coach Master Journal



---

## Aggregated from 2026-08-05-12-00-00.md

## 2026-08-05 - Accepted - Consolidate Redundancy in bolt.md
**Type:** Prompt improvement
**Outcome:** Submitted
**Why:** `.github/agents/bolt.md` contained hardcoded YAML frontmatter instructions (which violated schema constraints by requiring `rejection_count` and `rejection_reason` for IDEA nodes) and duplicated the `ls -1` sorting logic for sequence numbering. This caused prompt bloat and broke the DRY principle mandated by the Agile Coach's directive to consolidate redundancy and reference centralized documents.
**Pattern:** Proactively replaced redundant schema and file naming instructions with explicit references to `.foundry/docs/schema.md` and `.foundry/docs/knowledge_base/agents/core_policies.md` to prevent prompt rot and ensure system-wide consistency.
