---
id: task-082-140-implement-shiny-gene-utility
type: TASK
title: Implement Shiny Gene Parsing and Evaluation
status: COMPLETED
owner_persona: coder
created_at: '2026-05-23'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-082-dv-shiny-gene-logic
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Shiny Gene Parsing and Evaluation

## Context
In Generation 2 breeding, a Pokémon is a "Shiny Carrier" (possesses Shiny Genes) and has a chance to pass down shininess to its offspring if its DVs satisfy the following condition:
- Defense DV is exactly 10
- Special DV is either 2 or 10

Additionally, the save parser needs to extract these DVs from binary data using `DataView` if it doesn't already do so in a way that exposes them correctly.

## Objective
Ensure the save parser decodes DVs from binary data using `DataView` correctly. Implement `checkShinyGene` utility function in the save parser's common utilities and update the related type definitions to evaluate the extracted DVs against the Shiny Carrier rules.

## Requirements
1. Update `src/engine/saveParser/parsers/common.ts`:
   - Add a new utility function `checkShinyGene(dvs: { atk: number; def: number; spd: number; spc: number })` that returns `true` if `dvs.def === 10` and `(dvs.spc === 2 || dvs.spc === 10)`.
   - Update the `PokemonInstance` interface to include an optional `hasShinyGene?: boolean` property.
   - Verify that DVs are successfully unpacked using `parseDVs` which relies on `DataView` extractions.
2. Update `src/engine/saveParser/parsers/common.test.ts`:
   - Add unit tests for `checkShinyGene` ensuring it correctly identifies combinations that have the gene and those that do not.
   - Ensure tests cover DV decoding from binary data properly if modifications to decoding logic were necessary.

## Acceptance Criteria
- [x] `checkShinyGene` function is implemented and exported in `common.ts`.
- [x] Logic correctly decodes Gen 2 DVs from binary data using `DataView` (existing `parseDVs` usage is verified/updated).
- [x] `hasShinyGene` is added to `PokemonInstance` as an optional boolean.
- [x] Unit tests for `checkShinyGene` are written and pass.

## Reminder for Coder and QA
- If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
