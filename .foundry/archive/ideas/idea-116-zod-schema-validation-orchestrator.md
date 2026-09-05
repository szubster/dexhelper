---
id: idea-116-zod-schema-validation-orchestrator
type: IDEA
title: Implement Zod for Strict Node Schema Validation in Foundry Orchestrator
status: COMPLETED
owner_persona: product_manager
created_at: '2026-07-15'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
parent: null
tags:
  - foundry
  - orchestrator
  - architecture
rejection_reason: ''
locks: []
---

# Implement Zod for Strict Node Schema Validation in Foundry Orchestrator

## Description
As the Foundry Orchestrator evolves, manually verifying YAML frontmatter constraints (e.g., status enums, single owner_persona, proper array types for depends_on) in `.github/scripts/foundry-orchestrator.ts` has become brittle. Adopting a robust schema validation library like `zod` will eliminate silent failures, improve debugging when agents create malformed nodes, and ensure the DAG remains healthy.

## Acceptance Criteria
- [x] Product Manager: Convert this idea into a PRD to formalize the adoption of Zod in the Foundry orchestrator for YAML frontmatter validation.
- [x] prd-116-117-zod-schema-validation-orchestrator
