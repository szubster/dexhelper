---
id: task-490-550-orchestrator-badge-injection-impl
type: TASK
title: Orchestrator Badge Injection Implementation
status: READY
owner_persona: coder
created_at: '2026-09-06'
updated_at: '2026-09-06'
parent: story-408-490-orchestrator-themed-output-impl
depends_on:
  - task-490-549-orchestrator-console-theme-impl
jules_session_id: null
rejection_reason: ''
---

# Orchestrator Badge Injection Implementation

## Objective
Implement logic in the Foundry Orchestrator script to map node statuses and personas to Pokemon Gen 1 themed emoji badges and inject them into GitHub Action summaries.

## Details
Modify `.github/scripts/foundry-orchestrator.ts` (and relevant CI workflow scripts if necessary) to render emoji badges for personas (e.g. Eevee for Agile Coach) and state transitions.

## Acceptance Criteria
- [ ] Coder: Implement a mapping between personas and Pokemon Gen 1 themed emojis in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Coder: Implement a mapping between node statuses (e.g. FAILED, BLOCKED) and Pokemon Gen 1 themed emojis in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Coder: Update the GitHub Action summary output logic in `.github/scripts/foundry-orchestrator.ts` to include these emoji badges.
