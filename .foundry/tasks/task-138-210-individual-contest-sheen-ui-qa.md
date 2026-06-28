---
id: task-138-210-individual-contest-sheen-ui-qa
type: TASK
title: QA Contest Sheen UI Integration
status: ACTIVE
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-06-28'
depends_on:
  - task-138-209-individual-contest-sheen-ui-impl
jules_session_id: '4867053823246774364'
pr_number: null
parent: story-065-138-individual-contest-sheen-ui
tags:
  - feature
  - gen3
  - contests
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: QA Contest Sheen UI Integration

## 1. Context
This QA task verifies the integration of the `ContestSheenDisplay` component into the detailed Pokémon view (`PokemonCaughtDetails.tsx`) as implemented in `task-138-209-individual-contest-sheen-ui-impl`.

## 2. Testing Blueprint
- Verify that `ContestSheenDisplay` is imported and used in `PokemonCaughtDetails.tsx`.
- Verify that the display only appears when `generation === 3` and `p.condition` is present.
- Verify that the `sheen` prop passed is correct (`p.condition.sheen`).
- Review the aesthetic layout to ensure it fits nicely within the `TacticalPanel` and maintains the "tactical hardware" design system (e.g., proper spacing, use of mono font, borders).
- Verify that the automated tests added in `__tests__/PokemonCaughtDetails.test.tsx` adequately cover the new logic.

## 3. Important Reminders for QA
- **Transient Failures**: If you experience a transient failure requiring retry or test failure, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures**: If the implementation is fundamentally flawed or impossible, you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy**: If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting. Do not modify the YAML frontmatter on successful completion.

## 4. Acceptance Criteria
- [ ] Verify `ContestSheenDisplay` is correctly integrated for Gen 3 Pokémon in `PokemonCaughtDetails.tsx`.
- [ ] Verify unit tests cover the new component rendering.
- [ ] Verify aesthetic fit.
