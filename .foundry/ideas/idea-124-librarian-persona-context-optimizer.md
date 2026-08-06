---
id: idea-124-librarian-persona-context-optimizer
type: IDEA
title: Librarian Persona for Context Token Optimization
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-27'
updated_at: '2026-08-06'
depends_on: []
jules_session_id: '12806013623311356559'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - optimization
  - token-usage
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Librarian Persona for Context Token Optimization

## Description
To enhance the Foundry Orchestrator's efficiency and prevent the degradation of agent context windows, this idea proposes the introduction of a new Foundry Owner Persona: the **`librarian`**.

Following the strict Generation 1 gamification theme established in `idea-122`, the `librarian` will be mapped to **Snorlax (#143 - The Deep Dreamer)**. While it may appear asleep, its massive subconscious mind digests vast amounts of historical data into compact, essential memories.

Currently, as the repository grows, agent journals and archived nodes become heavily fragmented and verbose, consuming precious context tokens during context hydration and execution. The `librarian` persona will execute on a scheduled cadence (e.g., weekly or every X merged PRs) to ingest raw journals, extract actionable architectural invariants, update the centralized `.foundry/docs/knowledge_base`, and aggressively prune/archive stale entries.

---

## Rationale & Benefits
- **Context Token Preservation:** By synthesizing verbose day-to-day agent journals into dense, rule-based documentation (like `core_policies.md` or ADRs), the Orchestrator passes significantly smaller, high-signal context blocks to Jules instances.
- **Improved Grounding:** Consolidating learnings prevents critical, hard-won project knowledge from being buried deep inside individual, fragmented `.jules/<persona>/<session_id>.md` logs.
- **Gamification Synergy:** Fits perfectly into the newly established Gen 1 theme, providing a dedicated "garbage collection" and "memory consolidation" role that the `tpm` (Meowth) is currently too overloaded to handle optimally.

---

## Functional Mechanics
1. **Scheduled Wake-Up:** The Snorlax persona (Librarian) is awoken by the Orchestrator via a dedicated cron job or a specialized event trigger.
2. **Ingestion & Synthesis:** It reads all `.jules/*/*.md` and `.foundry/journals/*.md` files updated since its last run.
3. **Knowledge Extraction:** It identifies recurring patterns, permanent architectural constraints, and resolved anti-patterns.
4. **Documentation Updates:** It edits or proposes changes to files in `.foundry/docs/knowledge_base/` to permanently enshrine the new rules.
5. **Garbage Collection:** It archives or deletes the raw, ingested journal files to reset the context footprint.

---

## Acceptance Criteria
- [ ] Product Manager: Convert this idea into a PRD outlining the exact triggers, scripts, and responsibilities for the `librarian` persona.
- [ ] Architect: Review the proposed system architecture for integrating the `librarian` into the Foundry Orchestrator's cron schedules.
- [ ] Coder: Update `schema.md` to formally introduce the `librarian` role mapped to Snorlax.
- [ ] Coder: Implement the Node/TypeScript scripts in `.github/scripts/` to enable the Librarian's scheduled journal ingestion phase.
