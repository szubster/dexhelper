---
id: story-086-130-move-jsonl-compaction
type: STORY
title: Move JSONL Compaction and Output
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-29'
depends_on:
  - story-086-129-move-generation-discrepancies
jules_session_id: null
pr_number: null
parent: epic-049-086-dynamic-move-pp-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Move JSONL Compaction and Output

## Background
With move data extracted and generation discrepancies handled, the final step for this epic is to compact the data and output it to `moves.jsonl` in a scalable format.

## Goals
1. Apply compaction logic to strip out nulls, undefined values, and defaults (like accuracy 100) to minimize payload size.
2. Serialize the processed data into `moves.jsonl` in the `data/db` output directory.

## Acceptance Criteria
- [ ] Implement the compaction pass for move data based on the schema in ADR 025.
- [ ] Write the final compacted data to `data/db/moves.jsonl`.
- [ ] Ensure the output structure matches the specifications for the Vite plugin and IndexedDB integration.
- [ ] task-130-238-move-jsonl-compaction-impl
- [ ] task-130-239-move-jsonl-compaction-qa
