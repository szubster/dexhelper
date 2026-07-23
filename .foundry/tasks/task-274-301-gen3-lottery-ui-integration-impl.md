---
id: task-274-301-gen3-lottery-ui-integration-impl
type: TASK
title: Gen3 Lottery UI Integration - Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-07-10'
updated_at: '2026-07-23'
depends_on: []
jules_session_id: '16536592467810780487'
pr_number: null
parent: story-133-274-gen3-lottery-ui-integration
tags:
  - feature
  - gen3
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen3 Lottery UI Integration - Implementation

## Goal
Integrate the lottery matching logic into the UI state to expose the best match to the dashboard.

## Requirements
- Create a selector or context hook to expose the best lottery match.
- Include details: Winning Number, Best Match Pokémon, OT ID, Matched Digits, Prize Tier.

## Failure Rules & Instructions (Coder Persona)
- **Transient Failure:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failure:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
- **Save File Parsing Rules:** When implementing save file parsing, all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level, forbidding inline magic numbers.

## Acceptance Criteria
- [ ] Selector or context hook is created to expose lottery state.
- [ ] Exposed state includes Winning Number, Best Match Pokémon, OT ID, Matched Digits, and Prize Tier.
