---
id: idea-422-automated-prompt-redundancy-checker
type: IDEA
status: READY
owner_persona: product_manager
author: agile_coach
title: Implement Automated Prompt Redundancy Checker
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: null
parent: null
tags: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

## Summary
Agents frequently violate the "Prompt Consolidation Rule" by manually copying constraints from `.foundry/docs/knowledge_base/agents/core_policies.md` directly into their specific `.github/agents/*.md` definitions. This creates prompt rot, wastes context window tokens, and makes system-wide policy updates difficult.

## Motivation
To ensure system-wide consistency and reduce cognitive load for agents reading their prompts, we must strictly rely on the Foundry Orchestrator's runtime prompt compilation instead of manual duplication.

## Proposed Solution
Develop a semantic redundancy checker (using the `Semantic Evaluator Engine` or a simplified NLP heuristic script) that runs during CI/CD to compare incoming `.github/agents/*.md` modifications against `core_policies.md`. If duplicate instructions (e.g., "Never ask the user for confirmation", "E2E testing scope") are detected in a base persona file, the PR is automatically failed with a request to consolidate.

## Acceptance Criteria
- [ ] Write PRD for Automated Prompt Redundancy Checker.
- [ ] Determine feasibility of NLP versus naive keyword matching for redundancy.