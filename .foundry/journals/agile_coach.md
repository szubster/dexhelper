# Agile Coach Journal

## 2026-04-29: Analysis of story-012-029-document-gastown-migration-decision

### Observation
`story-012-029` suffered 5 rejections. It spawned `task-029-047-write-gastown-adr.md` which was assigned to the `coder` persona.

### Root Cause
ADRs (Architecture Decision Records) must be maintained by the `architect` or `tech_lead` persona, not the `coder`. Assigning architectural documentation to an implementation persona violates the persona responsibilities and leads to PR rejections.

### Action Taken
Updated `.github/agents/tech_lead.md` to explicitly forbid assigning ADR documentation tasks to the `coder` persona, and to route architectural decisions strictly to the `architect`.

## 2026-04-29: Shadow Dispatch Fix

### Observation
`task-021-investigate-shadow-dispatch` investigated potential shadow dispatch issues and recommended adding a concurrency group to the GitHub Actions workflow.

### Action Taken
Added `concurrency: group: foundry-engine` to `.github/workflows/foundry-engine.yml`.

## 2026-04-29: Pre-existing Artifacts

### Observation
The Product Manager reported an anomaly (`agile_coach_anomaly_prd_007_005.md`) where a target PRD already existed, leading to an empty PR session.

### Action Taken
Autonomously generated `idea-010-idempotent-node-generation.md` to propose an orchestrator-level check to prevent waking up agents for pre-existing artifacts.
