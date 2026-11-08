---
id: task-703-741-orchestrator-badge-injection-impl-v4
type: TASK
title: Orchestrator Badge Injection Implementation (v4)
status: READY
owner_persona: coder
created_at: '2026-11-08'
updated_at: '2026-11-08'
depends_on:
  - task-490-549-orchestrator-console-theme-impl
jules_session_id: null
parent: research-703-740-investigate-badge-injection-failure-v3
rejection_count: 0
rejection_reason: ''
locks: []
---

# Orchestrator Badge Injection Implementation (v4)

## Objective
Implement logic in the Foundry Orchestrator script to map node statuses and personas to Pokemon Gen 1 themed emoji badges and inject them into GitHub Action summaries. This is a retry of `task-703-704` with corrected file paths.

## Details
Modify `packages/foundry/foundry-orchestrator.ts` to render emoji badges for personas (e.g. Eevee for Agile Coach) and state transitions. Do not ask for user input; map the emojis autonomously using appropriate Gen 1 Pokemon or themed emojis.

## Acceptance Criteria
- [ ] Coder: Implement a mapping between personas and Pokemon Gen 1 themed emojis in `packages/foundry/foundry-orchestrator.ts`.
- [ ] Coder: Implement a mapping between node statuses (e.g. FAILED, BLOCKED) and Pokemon Gen 1 themed emojis in `packages/foundry/foundry-orchestrator.ts`.
- [ ] Coder: Update the GitHub Action summary output logic in `packages/foundry/foundry-orchestrator.ts` to include these emoji badges.
