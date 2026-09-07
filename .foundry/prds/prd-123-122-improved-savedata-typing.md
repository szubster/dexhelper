---
id: prd-123-122-improved-savedata-typing
type: PRD
title: Improved SaveData Typing with Discriminated Generation Unions
status: COMPLETED
owner_persona: auditor
created_at: '2026-08-05'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-123-improved-savedata-typing
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

# Product Requirements Document: Improved SaveData Typing with Discriminated Generation Unions

## 1. Introduction
The `saveParser` module currently defines `SaveData` as a monolithic type that encompasses parsed state from Gen 1, Gen 2, and Gen 3 games. The lack of generation-specific constraints forces developers to manually verify the existence of optional properties, degrading developer experience (DX) and increasing the risk of runtime errors.

This project aims to refactor the `SaveData` type into a Discriminated Union based on the `generation` field.

## 2. Objectives
- Improve TypeScript developer experience by enforcing property existence based on generation.
- Reduce error-prone manual property checks.
- Prevent invalid generation-specific property access at compile-time.
- Make the `SaveData` type self-documenting.

## 3. Scope
- Define `BaseSaveData` containing shared fields.
- Define `Gen1SaveData`, `Gen2SaveData`, and `Gen3SaveData` extending `BaseSaveData` with required generation-specific fields and a literal `generation` discriminator.
- Update `SaveData` to be a union of the specific generation types.
- Update the generation parsers (`src/engine/saveParser/parsers/common.ts`, `gen1.ts`, `gen2.ts`, `gen3.ts`) to return the appropriately narrowed types.

## 4. Requirements & Acceptance Criteria
- [ ] Architect: Design and draft an ADR (Architecture Decision Record) detailing the typed schema, and map out downstream consumer components that will benefit from this type narrowing.
- [ ] Coder: Refactor the `SaveData` union type in `src/engine/saveParser/parsers/common.ts` and ensure all parser modules (`gen1.ts`, `gen2.ts`, `gen3.ts`) return their respective narrowed types properly.
- [ ] QA: Run all existing parser tests to ensure no regressions occur and verify type-narrowing works seamlessly.

## 5. Non-Functional Requirements
- Maintain backward compatibility in terms of runtime data shape.
- Ensure no runtime overhead is introduced by type definitions.

- [x] epic-122-404-refactor-savedata-typing
