---
id: research-272-311-gen3-lottery-offsets
type: RESEARCH
title: Research Gen3 Lottery Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-05'
updated_at: '2026-07-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-133-272-research-lottery-offsets
tags:
  - gen3
  - research
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Research Gen3 Lottery Offsets

Research the memory offsets for the daily lottery PRNG seed in Ruby, Sapphire, and Emerald save files.

## Context
We need to extract the daily lottery PRNG seed to predict lottery numbers for the user in our Route Radar and utility dashboards. The values are stored differently across the various Gen 3 games.

## Requirements
- Identify the exact memory offsets and sizes for the daily lottery PRNG seed in Ruby, Sapphire, and Emerald.
- The offsets must be documented in a new or existing knowledge base document under `.foundry/docs/knowledge_base/` (e.g. `gen3_lottery_offsets.md`).
- Ensure the documentation adheres to existing architectural decisions, such as using relative offsets based on save blocks (ADR 028) instead of absolute offsets where applicable.

## Technical Contract
- **Module-Level Constants**: When writing actual parsing code based on this research (in later tasks), all memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. Inline magic numbers are strictly forbidden.
- **Handling Failures**:
  - If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
  - If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PRs**: If you submit an empty PR for a completed task (e.g. simply creating the markdown file was the scope), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Create or update a document in `.foundry/docs/knowledge_base/` detailing the lottery offsets for Ruby, Sapphire, and Emerald.
- [x] Include the memory offset, data type/length, and the block in which it resides (e.g. SaveBlock1, SaveBlock2).
- [x] Verify that the offsets align with standard Gen 3 save file documentation (e.g., bulbapedia, smogon, or other romhacking resources).
