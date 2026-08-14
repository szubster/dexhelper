---
id: idea-145-semantic-prompt-validation
type: IDEA
title: Semantic Validation for Agent Prompts
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-11'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: '5495596116386946728'
pr_number: null
parent: null
tags:
  - testing
  - prompts
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Semantic Validation for Agent Prompts

## Problem
Currently, tests verifying agent process rules (such as enforcing specific behaviors in `.github/agents/*.md`) rely on brittle exact string matching (e.g., `expect(content).toContain('exact string')`). This approach is fragile; if a prompt is rephrased or structurally modified but retains its semantic meaning, the tests will falsely fail, increasing maintenance burden and friction for persona instruction updates.

## Proposed Solution
Implement a system for semantic validation of agent prompts. Instead of asserting exact strings, we should explore utilizing a semantic evaluator (e.g., an LLM-based assertion utility or a structured abstract representation) that verifies the *intent* and presence of a rule rather than its precise textual representation.

## Value Proposition
This will make persona instructions and process updates much more resilient to refactoring, reducing the overhead of updating brittle tests every time a prompt's phrasing is improved, while still enforcing critical process rules like E2E story generation.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD exploring the feasibility and architecture of a semantic validation utility for prompt tests.
