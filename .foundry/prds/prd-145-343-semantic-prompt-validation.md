---
id: prd-145-343-semantic-prompt-validation
type: PRD
title: Semantic Validation for Agent Prompts PRD
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: '7654390589700833801'
pr_number: null
parent: idea-145-semantic-prompt-validation
tags:
  - testing
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Semantic Validation for Agent Prompts PRD

## Problem Definition
Tests verifying agent process rules (such as enforcing specific behaviors in `.github/agents/*.md`) rely on brittle exact string matching. If a prompt is rephrased or structurally modified but retains its semantic meaning, the tests falsely fail, increasing maintenance burden.

## Proposed Solution
Implement a semantic validation utility (e.g., using an LLM-based assertion or a structured abstract representation evaluator) for agent prompt tests. This utility should verify the intent and presence of a rule rather than its precise textual representation, making tests resilient to refactoring while still enforcing critical process rules like E2E story generation.

## Value Proposition
This will make persona instructions and process updates much more resilient to refactoring, reducing the overhead of updating brittle tests every time a prompt's phrasing is improved.

## Acceptance Criteria
- [x] Break down this PRD into Epics.
- [ ] epic-343-417-semantic-evaluator-core
- [ ] epic-343-418-agent-test-migration
