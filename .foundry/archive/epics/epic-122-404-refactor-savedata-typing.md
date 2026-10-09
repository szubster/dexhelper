---
id: epic-122-404-refactor-savedata-typing
type: EPIC
title: Refactor SaveData Typing with Discriminated Generation Unions
status: COMPLETED
owner_persona: story_owner
created_at: '2026-08-06'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-123-122-improved-savedata-typing
tags:
  - savedata
  - typescript
  - refactoring
  - type-safety
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Refactor SaveData Typing with Discriminated Generation Unions

## Context & Objectives
The current `SaveData` type is monolithic, lacking generation-specific constraints. This epic will refactor `SaveData` into a discriminated union based on the `generation` field, improving type-safety and developer experience by eliminating manual property existence checks.

## Scope
- Architect: Draft an ADR for the typed schema and downstream consumers.
- Coder: Refactor the union type and ensure `gen1.ts`, `gen2.ts`, and `gen3.ts` parsers return the narrowed types.
- QA: Verify parser tests and type narrowing.

## Acceptance Criteria
- [x] Draft an Architecture Decision Record (ADR) detailing the typed schema and downstream consumer impact.
- [x] Refactor `SaveData` in `src/engine/saveParser/parsers/common.ts` into a discriminated union.
- [x] Update generation-specific parsers to return the correctly narrowed types.
- [x] Ensure all existing parser tests pass without regressions.
- [x] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
- [x] story-404-361-draft-savedata-adr
- [x] story-404-362-refactor-savedata-type
- [x] story-404-363-update-parsers
- [x] story-404-364-savedata-e2e-verification
