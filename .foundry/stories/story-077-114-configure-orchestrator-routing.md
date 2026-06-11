---
id: story-077-114-configure-orchestrator-routing
type: STORY
title: Configure Orchestrator to route styling-heavy PRs/tasks to designer persona
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on:
  - story-077-113-update-designer-persona
jules_session_id: null
pr_number: null
parent: epic-071-077-tailwind-designer-persona
tags:
  - styling
  - agents
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Configure Orchestrator to route styling-heavy PRs/tasks to designer persona

## Objective
Configure the Foundry Orchestrator or GitHub Actions (if applicable) to route styling-heavy PRs or tasks that modify `src/index.css` to this persona for review or implementation.

## Scope
1. Update `.github/scripts/foundry-orchestrator.ts` or relevant workflow configurations.
2. Ensure tasks primarily involving Tailwind modifications or custom utilities are correctly assigned to the `designer` persona or flagged for its review.

## Acceptance Criteria
- [ ] Foundry Orchestrator / Github Actions correctly routes `src/index.css` modifications to the `designer` persona.
