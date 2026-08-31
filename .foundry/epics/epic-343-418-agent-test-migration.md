---
id: epic-343-418-agent-test-migration
type: EPIC
title: Agent Test Migration to Semantic Validation
status: ACTIVE
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-31'
depends_on:
  - epic-343-417-semantic-evaluator-core
jules_session_id: '12113325506310725835'
pr_number: null
parent: prd-145-343-semantic-prompt-validation
tags:
  - testing
  - prompts
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Agent Test Migration to Semantic Validation

## Description
Migrate existing tests that verify agent process rules (e.g., in `.github/agents/*.md`) from brittle exact string matching to the new semantic validation utility, ensuring resilience against prompt refactoring.

## Acceptance Criteria
- [x] Break down this Epic into Stories.
- [x] Ensure a final STORY dedicated exclusively to Integration and E2E Verification is generated.
- [ ] story-418-494-agent-test-migration-core
- [ ] story-418-495-agent-test-migration-e2e
