---
id: task-490-527-orchestrator-themed-badges-impl
type: TASK
title: Implement Orchestrator Themed GitHub Action Badges
status: READY
owner_persona: coder
created_at: '2026-08-29'
updated_at: '2026-08-29'
depends_on:
  - task-490-526-orchestrator-themed-console-impl
jules_session_id: null
pr_number: null
parent: story-408-490-orchestrator-themed-output-impl
tags:
  - foundry
  - orchestrator
  - gamification
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Orchestrator Themed GitHub Action Badges

## Objective
Modify the Foundry Orchestrator script (.github/scripts/foundry-orchestrator.ts) to inject Pokemon Gen 1 themed emoji badges into GitHub Action summaries.

## Context
As part of the gamification effort, the GitHub Action summary should display Gen 1 themed emoji badges based on node status and persona.
- Map node statuses and personas to appropriate Gen 1 emojis/badges.
- Inject these badges into the GitHub Actions step summary generation.

## Acceptance Criteria
- [ ] Coder: Update \`.github/scripts/foundry-orchestrator.ts\` to generate and output themed emoji badges to the Action summary based on status and persona.
- [ ] Coder: Ensure orchestrator tests (\`cd .github/scripts && pnpm install && npx vitest\`) pass.
