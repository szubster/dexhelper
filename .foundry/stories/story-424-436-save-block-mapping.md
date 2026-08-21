---
id: story-424-436-save-block-mapping
type: STORY
title: Save Block Mapping
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-14'
updated_at: '2026-08-21'
depends_on:
  - story-424-435-wasm-memory-buffer-hook
jules_session_id: '17372347473518866949'
pr_number: null
parent: epic-343-424-live-memory-reading
tags:
  - emulator
  - memory
  - parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Save Block Mapping

## Context
Following the establishment of a real-time raw WASM memory buffer channel (story-424-435-wasm-memory-buffer-hook), we need to interpret this data. This story focuses on continuously mapping standard save blocks and game state variables from the live memory buffer and routing them through our existing standard save block parsers (adhering strictly to ADR 010 and related guidelines for Gen 3 data).

## Acceptance Criteria
- [ ] Tech Lead: Break down this STORY into TASK nodes, ensuring discrete tasks for the mapping logic, state variables extraction, and integration with existing parsers.
