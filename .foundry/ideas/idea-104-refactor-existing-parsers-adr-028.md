---
id: idea-104-refactor-existing-parsers-adr-028
type: IDEA
title: Refactor Existing Parsers for ADR 028
status: PENDING
owner_persona: product_manager
created_at: '2026-07-06'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - architecture
  - save-parsing
  - offset-mapping
  - technical-debt
research_references: []
notes: ''
rejection_reason: ''
---

# Refactor Existing Parsers for ADR 028

## Objective
Refactor existing save parsing logic across all generations to comply with the newly established ADR 028, which mandates the use of reusable constants for memory offsets, lengths, bit locations, and shifts instead of inline magic numbers.

## Context
During the completion of `epic-053-103-relative-offsets-adr`, we established ADR 028 because tooling limitations prevented us from building a custom linter rule to enforce this pattern. Since we must rely on manual enforcement and code review, we need to proactively address the technical debt in legacy parsers to align them with this new architectural constraint.

## Acceptance Criteria
- [ ] prd-104-517-refactor-existing-parsers-adr-028
