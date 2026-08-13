---
id: prd-142-342-automated-adr-compliance-linter
type: PRD
title: Automated ADR Compliance Linter PRD
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-12T00:00:00.000Z'
updated_at: '2026-08-13'
depends_on: []
jules_session_id: '3355379518708574393'
pr_number: null
parent: idea-142-automated-adr-compliance-linter
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Automated ADR Compliance Linter PRD

## Problem Definition
As the system scales and more Architectural Decision Records (ADRs) are introduced, enforcing these guidelines relies heavily on expensive QA LLM tokens. It is inefficient and error-prone to burn context window space having LLMs verify static structural rules.

## Proposed Solution
We need an automated static analysis linter script (e.g. `scripts/verify-adr-compliance.ts`) that enforces concrete violations of ADRs before code is sent to the QA persona.

Specifically, this script must use tools like `biome` and `oxlint` (which are already present in the codebase) to:
1.  **Enforce ADR 008 (UI Constraints):** Check for tactical hardware aesthetics. The script should verify the usage of sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (e.g., `font-mono`) and strictly flag invalid classes (like `rounded-t`, `rounded-b`, `rounded-sm`).
2.  **Enforce ADR 013 (Component State):** Ensure React context is used for lifting state to share between the Kanban Board and React Flow visualizations, verifying that appropriate state layers are implemented where needed.

## Value Proposition
This significantly reduces LLM context token consumption and offloads static architectural compliance enforcement to faster, deterministic CI checks. This frees up the QA persona to focus exclusively on complex behavioral verification.

## Acceptance Criteria
- [ ] Epic Planner: Draft an Epic breaking down the linter script and CI integration into technical chunks.
