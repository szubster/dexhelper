---
id: research-562-710-investigate-gen2-wild-encounter-extraction-failure-v3
type: RESEARCH
title: Investigate Gen 2 Wild Encounter Extraction Logic Failure (v3)
status: READY
owner_persona: researcher
created_at: '2026-10-20'
updated_at: '2026-10-29'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - investigation
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Investigate Gen 2 Wild Encounter Extraction Logic Failure (v3)

## Context
The research node `research-562-687-investigate-gen2-wild-encounter-extraction-failure-retry` failed permanently. We need to investigate why the extraction of Gen 2 wild encounter and held item data failed, and provide the correct memory offsets, constraints, and instructions for the replacement task.

## Requirements
- Review the rejection history of previous failures for Gen 2 wild encounter extraction.
- Identify the root cause of the failure (e.g. missing memory offsets, incorrect data structures, magic numbers).
- Provide the correct module-level constants and memory mappings for Gen 2 wild encounters and held items.
- Ensure compliance with `.foundry/docs/schema.md`.

## Acceptance Criteria
- [ ] Document the root cause of the previous failure.
- [ ] Provide explicit, accurate constants/offsets to unblock the coder.
