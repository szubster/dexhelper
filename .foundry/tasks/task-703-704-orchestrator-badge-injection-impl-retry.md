---
id: task-703-704-orchestrator-badge-injection-impl-retry
type: TASK
title: Orchestrator Badge Injection Implementation Retry
status: READY
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-11-01'
depends_on:
  - task-490-549-orchestrator-console-theme-impl
jules_session_id: null
parent: research-490-703-investigate-badge-injection-failure-v2
rejection_reason: ''
locks: []
rejection_count: 2
---

# Orchestrator Badge Injection Implementation Retry

## Objective
Implement logic in the Foundry Orchestrator script to map node statuses and personas to Pokemon Gen 1 themed emoji badges and inject them into GitHub Action summaries. This is a retry of `task-490-550` which failed due to No-Ask policy violations.

## Details
Modify `.github/scripts/foundry-orchestrator.ts` to render emoji badges for personas (e.g. Eevee for Agile Coach) and state transitions. Do not ask for user input; map the emojis autonomously using appropriate Gen 1 Pokemon or themed emojis.

## Acceptance Criteria
- [ ] Coder: Implement a mapping between personas and Pokemon Gen 1 themed emojis in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Coder: Implement a mapping between node statuses (e.g. FAILED, BLOCKED) and Pokemon Gen 1 themed emojis in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Coder: Update the GitHub Action summary output logic in `.github/scripts/foundry-orchestrator.ts` to include these emoji badges.
