---
id: prd-116-117-zod-schema-validation-orchestrator
type: PRD
title: Implement Zod for Strict Node Schema Validation in Foundry Orchestrator
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-07-17'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
parent: idea-116-zod-schema-validation-orchestrator
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

This PRD outlines the adoption of Zod for parsing and validating `.foundry/**/*.md` files within the Foundry Orchestrator.

## Architectural Goals
- Define a single source of truth for the node schema using Zod, mapped directly to the constraints established in `.foundry/docs/schema.md`.
- Reject malformed nodes strictly and output clear, actionable error messages.
- Improve maintainability of the `foundry-orchestrator.ts` by replacing manual validation logic with the Zod schema.

## Acceptance Criteria
- [x] Break down into Epics
- [x] epic-117-334-define-zod-schema
- [x] epic-117-335-integrate-zod-orchestrator
