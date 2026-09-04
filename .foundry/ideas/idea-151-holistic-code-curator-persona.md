---
id: idea-151-holistic-code-curator-persona
type: IDEA
title: >-
  Holistic Code Curator Persona: Architectural Refactoring & Historical
  Backtracking
status: PENDING
owner_persona: product_manager
created_at: '2026-08-15'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - personas
  - refactoring
  - architecture
  - quality
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Holistic Code Curator Persona: Architectural Refactoring & Historical Backtracking

## Summary & Objectives
When epics, stories, and tasks are implemented in isolation, local optimization often creates macro-level code quality issues: redundant patterns, inconsistent architectural boundaries, missing end-to-end/integration test coverage, and subtle regressions across older features.

To solve this, we propose introducing a new dedicated Foundry persona: **`curator`** (Gen 1 Pokémon skin: **Kadabra / Arbok / Persian** - proposed **`curator` ➔ Persian (#053 - The Discerning Evaluator)** or **`curator` ➔ Alakazam-tier / Porygon-Z / Hypno**).

The `curator` (or **Holistic Code Curator / Architect Guardian**) is designed to take a wide-angle, repository-wide view after features are implemented. Rather than making direct code changes itself, the Curator inspects the codebase, identifies architectural decay or test gaps, spawns appropriate new nodes (IDEA, EPIC, STORY, TASK, RESEARCH, ADR), passes control back to the originating feature flow for re-verification, and backtracks through historical ideas to prevent hidden regressions.

---

## Detailed Rationale
1. **Isolation Risks:** Isolated task implementations frequently miss opportunities for DRY consolidation, cross-module optimization, and unified error handling.
2. **Separation of Concerns:** Direct code fixes by a reviewer persona lead to scope creep and lack of focused accountability. By forcing the Curator to only create structured nodes (Ideas, Epics, Stories, Tasks, Research, ADRs), refactorings go through standard design, scheduling, and verification pipelines.
3. **Re-Verification Guardrails:** Code refactors can introduce subtle regressions into existing features. Control handoff back to the initiating Idea node ensures re-verification by QA/Verifiers.
4. **Historical Backtracking:** New features often invalidate assumptions made by older, implemented (or even archived) ideas. A systematic backtracking process ensures legacy capabilities remain sound.

---

## Persona Identity & Mappings
- **System Role:** `curator` (The Holistic Code Curator & Architectural Refactoring Reviewer)
- **Gen 1 Pokémon Skin:** **Persian (#053 - The Discerning Evaluator)**
  - *Lore:* Possessing an immaculate eye for flawlessness and elegance, Persian steps back after the brawl of implementation to inspect the entire territory. It identifies tarnished code, structural stress points, and missing safeguards, issuing precise directives to restore perfection.
- **Agent Companion Mapping:** **🧠 Inspector / Curator (Kadabra - #064)**
  - *Lore:* Scans lines of code across all modules simultaneously using psychic foresight to spot systemic structural anti-patterns.

---

## Process & Control Handoff Lifecycle

```
[ Feature Idea Implemented ]
           │
           ▼
[ Curator Audit Triggered ] ──── (Inspects full repository & test suite)
           │
           ├──► Finds no issues ──► Return control to Idea ──► QA Re-Verification
           │
           └──► Finds refactor/test opportunities
                       │
                       ▼
           [ Spawn New Node(s) ] ── (IDEA, EPIC, STORY, TASK, RESEARCH, ADR)
                       │
                       ▼
           [ Link Dependencies / Parent References ]
                       │
                       ▼
           [ Return Control to Initiating Idea Node ]
                       │
                       ▼
           [ Idea Node Enters Re-Verification Stage ]
```

### 1. Trigger & Scope
- **Post-Implementation Trigger:** Automatically invoked when a top-level feature Idea completes its child execution graph before final closure.
- **Systemic Scope:** The Curator examines the entire codebase (`src/`, `.foundry/`, tests, utils) rather than just files changed in the latest PR.

### 2. Node Spawning Rules
The Curator **never modifies application code directly**. Depending on findings, it selects and spawns appropriate node types:
- **`TASK`:** Small, localized code cleanups, magic number extractions, or missing unit tests.
- **`STORY` / `EPIC`:** Multi-file structural refactoring, module consolidation, or substantial test suite additions.
- **`IDEA` / `RESEARCH`:** Non-trivial architectural redesigns, benchmarking requests, or alternative pattern explorations.
- **`ADR`:** Standardization of new architectural policies discovered during review.

### 3. Control Return & Re-Verification Stage
- Once the Curator completes its audit and spawns necessary nodes (if any), control transitions back to the originating **`IDEA`** node.
- The originating `IDEA` node is required to go through the **Verification Stage** again under the QA/Verifier persona (`qa` / `auditor`).
- This guarantees that any refactoring tasks or follow-up changes spawned by the Curator pass through full verification before the feature is permanently archived.

---

## Historical Backtracking Process (Legacy Idea Verification)

To ensure that newly added features or refactorings do not break older ideas—including those already `COMPLETED` or moved to `.foundry/archive/`—the Curator implements a **Historical Backtracking Process**:

1. **Impact Analysis Indexing:**
   - Maintain a lightweight historical mapping (`.foundry/docs/architecture/idea_dependency_matrix.md` or metadata index) connecting historical Idea/PRD nodes to the modules, data schemas, and API contracts they touched.
2. **Backtracking Audit Runs:**
   - On major feature additions or scheduled Curator runs, the Curator backtracks through implemented/archived Ideas whose domain boundaries overlap with recent changes.
3. **Regression & Compatibility Probing:**
   - Re-evaluates test coverage and schema compatibility for legacy ideas against current repository state.
4. **Remediation Node Creation:**
   - If a legacy feature/idea is degraded by recent changes, the Curator spawns a follow-up `TASK` or `STORY` linked to both the legacy idea and current codebase context, putting it into the standard dispatch queue.

---

## Acceptance Criteria
- [ ] prd-151-518-holistic-code-curator-persona
- [x] Product Manager: Convert this idea into a PRD (`prd-151-holistic-code-curator-persona`).
- [ ] Architect: Update `.foundry/docs/schema.md` to register `curator` in the `owner_persona` enum and define Persian (#053) mapping.
- [ ] Tech Lead: Update `.github/scripts/foundry-orchestrator.ts` to support the post-implementation Curator trigger and re-verification loop.
- [ ] Coder: Create default journal directory `.foundry/journals/curator/` and base instructions.
