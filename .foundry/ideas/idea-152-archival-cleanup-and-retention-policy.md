---
id: idea-152-archival-cleanup-and-retention-policy
type: IDEA
title: Archival Cleanup & Incremental Node Retention Policy
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-15'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '15685698527204897874'
pr_number: null
parent: null
tags:
  - foundry
  - archive
  - retention
  - garbage-collection
  - persona
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Archival Cleanup & Incremental Node Retention Policy

## Context & Problem Statement
The `.foundry/archive/` directory has grown significantly as tasks, stories, epics, research, PRDs, and ideas are completed and archived. While preserving historical context is essential for auditing and agent memory, retaining every historical node indefinitely introduces repository bloat and overhead for file scanning utilities.

We need a systematic retention and cleanup policy:
1. **Retention Strategy:** Determine which node types must be retained permanently vs. which can be pruned or deleted.
   - Core decision artifacts (e.g., `ADR`, `PRD`, `RESEARCH`, and potentially `IDEA`) likely provide high long-term knowledge value and may be kept permanently or aggregated.
   - Granular execution nodes (`TASK`, `STORY`, `EPIC`, or obsolete `IDEA` nodes) may lose relevance over time.
2. **Age & Value Criteria:** Items older than 3 months without active references or long-term historical value, as well as obsolete/superseded nodes, should be purged.
3. **Incremental Cleanup (Chunking):** To prevent massive git churn or performance spikes in a single run, cleanup operations must run incrementally, enforcing a maximum threshold of changes (e.g., max 20-50 node deletions/moves) per scheduled session.
4. **Persona & Workflow Ownership:** Decide whether to create a dedicated scheduled persona (e.g., `archivist` or `janitor`) or extend an existing maintenance persona (e.g., `tpm` or `librarian`).

## Key Research Questions
- **Node Categorization:** Which node types in `.foundry/archive/` yield long-term architectural value (`PRD`, `ADR`, `RESEARCH`, `IDEA`), and which are transient operational artifacts (`TASK`, `STORY`, `EPIC`)?
- **Retention Baseline:** Should ideas without downstream implementations or active references be retained indefinitely or pruned after 3 months?
- **Execution Strategy:** How should the chunking/batch limit be configured (e.g., maximum deletions per cycle) to guarantee safe and deterministic execution?
- **Persona Role:** Should the scheduled `tpm` or `librarian` persona take ownership of archival pruning via GitHub Actions, or should a new persona be registered in the schema?

## Next Steps / Acceptance Criteria
- [ ] Product Manager: Convert this IDEA into a PRD detailing node retention rules, threshold limits, and persona/cron automation workflows.
