---
id: task-286-314-filter-swarm-item-calls-impl
type: TASK
title: Implement High-Value Pokegear Call Filtering
status: FAILED
owner_persona: coder
created_at: '2026-07-11'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-118-286-filter-swarm-item-calls
tags:
  - feature
  - gen2
  - data
  - implement
research_references: []
rejection_count: 2
rejection_reason: 'Implementation missing. No Gen 2 phone call mechanics were implemented in the source code.'
notes: ''
---

# Task: Implement High-Value Pokegear Call Filtering

## Objective
Implement data logic to identify and filter high-value Pokegear calls in Gen 2 (Gold, Silver, Crystal), specifically targeting swarm and item-giving callers, based on known game logic and state flags.

## Context & Rules
This task requires understanding of Gen 2 phone mechanics:
- `wSwarmFlags` (1 byte): Active swarms.
- `wDailyPhoneItemFlags` / `wDailyPhoneTimeOfDayFlags` (4 bytes each): Manage item-giving states.

### Crucial Architectural Constraints & Reminders (Must Read!)
- **NO INLINE MAGIC NUMBERS:** When extracting dynamic save blocks or parsing flags, all memory offsets, lengths, bit locations, and shifts **MUST be defined as reusable constants at the module level.** You are strictly forbidden from using inline magic numbers.
- **Handling Failures:** If you experience a transient failure requiring a retry, update this YAML frontmatter to `status: FAILED` with a clear `rejection_reason`. If the task is permanently impossible or max rejections are reached, update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If the required logic is already present or you must submit an empty PR, you **MUST check off all Acceptance Criteria checkboxes** below before submitting. Submitting an empty PR with unchecked boxes violates ADR 007/009 and will result in immediate rejection.

## Acceptance Criteria
- [ ] Create or update the logic layer to identify callers associated with swarms.
- [ ] Create or update the logic layer to identify callers that offer rare items.
- [ ] Implement a filtering mechanism or add a flag to the data structure that distinguishes these "high-value" calls from standard calls.
- [ ] Ensure all necessary flags and bitmasks (`wSwarmFlags`, `wDailyPhoneItemFlags`, etc.) are mapped correctly without using magic numbers in inline logic.
- [ ] research-286-336-gen2-phone-memory-offsets
