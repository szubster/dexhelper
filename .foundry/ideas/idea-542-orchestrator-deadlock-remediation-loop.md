---
id: idea-542-orchestrator-deadlock-remediation-loop
type: IDEA
title: Foundry Orchestrator Hierarchical Deadlock Auto-Remediation Loop
status: READY
owner_persona: product_manager
created_at: '2026-11-01'
updated_at: '2026-11-01'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - foundry
  - orchestrator
  - dag
  - deadlock
  - graph
  - auto-healing
rejection_count: 0
system_failure_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Foundry Orchestrator Hierarchical Deadlock Auto-Remediation Loop

## Context & Problem Statement
In the Foundry multi-agent factory, parent macro nodes (`PRD`, `EPIC`, `STORY`) spawn child nodes and track them via unchecked Acceptance Criteria checkboxes (`- [ ] <node_id>`), meaning a parent implicitly waits for all descendants to reach `COMPLETED`. Concurrently, downstream child nodes or autonomous agents occasionally declare an explicit dependency on their parent node or an ancestor node in their frontmatter (`depends_on: [parent_id]`).

While `packages/foundry/foundry-orchestrator.ts` contains detection logic (Phase 3.10: `Hierarchical deadlock detected` and Phase 3.9: `Circular dependency detected`), the current system action is purely punitive: it logs a warning via `warn(...)` and forces the affected `PENDING` nodes into `FAILED` status with `promoteNodeToFailedWithReason(..., 'Hierarchical deadlock detected')`.

Because parent nodes cannot complete until child nodes finish, and child nodes marked `FAILED` are either resurrected or eventually marked `CANCELLED` (permanently blocking the parent unless late-binding recovery or complex manual intervention is triggered), this cycle creates an unrecoverable deadlock trap. The orchestrator diagnoses the condition with Kahn/Tarjan/path traversal algorithms, but lacks an automated self-healing remediation mechanism to sever illegal ancestor dependencies.

## Proposed Solution
Introduce an **Automated Deadlock Self-Healing & Remediation Loop** in `packages/foundry/foundry-orchestrator.ts`:
1. **Ancestry Path Invariant Check**: Formalize a pre-resolution validator that compares a node's declared `depends_on` entries against its transitive parent hierarchy (walking up `parent:` frontmatter references).
2. **Surgical Dependency Severance**: When an explicit dependency on an ancestor node (`child -> parent` or `child -> ancestor`) is detected, rather than failing both nodes, the orchestrator surgically removes the illegal ancestor ID from the child's `depends_on` list in-place (updating frontmatter and logging a self-healing audit entry).
3. **Telemetry & Resilience Audit**: Record auto-healed dependency edges in the active run metrics / `.foundry/journals/auditor/` to alert meta-agents (`agile_coach`, `tpm`) of recurring persona prompt formatting defects while keeping the DAG active and progressing without human intervention.
4. **Graceful Fallback for Complex Multi-Node Cycles**: If a cycle is formed through peer-to-peer task dependencies rather than direct ancestry, isolate the exact cycle path and transition only the newest/leaf dependent node to a dedicated `INVESTIGATING` or `RESEARCH` requirement, preventing whole-subgraph gridlock.

## Strategic Balance Rationale
In preceding sessions, ideas focused on application-level features (such as `idea-540-gen1-3-capture-rate-pokeball-efficiency-calculator` and `idea-541-tracker-collection-data-integrity-guard`). To strictly maintain the required 50/50 balance between DexHelper product features and Foundry system orchestrator infrastructure, this session targets a core resilience pain point in the Foundry DAG execution engine.

## Impact & Value
- Eliminates recurring deadlock halts across autonomous agent swarms.
- Converts passive diagnostic warnings into active, self-healing graph remediation.
- Significantly increases pipeline throughput and prevents zombie DAG subtrees caused by accidental circular parent-child declarations.

## Acceptance Criteria
- [ ] Product Manager: Draft a comprehensive PRD defining the hierarchical deadlock severance algorithms, frontmatter mutation safety rules, and telemetry audit specifications.
