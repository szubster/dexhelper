---
id: task-286-315-filter-swarm-item-calls-qa
type: TASK
title: QA High-Value Pokegear Call Filtering
status: ACTIVE
owner_persona: qa
created_at: '2026-07-11'
updated_at: '2026-07-31'
depends_on:
  - task-286-314-filter-swarm-item-calls-impl
jules_session_id: '14863696901989894627'
pr_number: null
parent: story-118-286-filter-swarm-item-calls
tags:
  - feature
  - gen2
  - data
  - qa
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: QA High-Value Pokegear Call Filtering

## Objective
Verify the implementation of the high-value Pokegear call filtering logic in Gen 2, ensuring it correctly identifies swarm and item-giving callers and strictly adheres to architectural guidelines.

## Context & Rules
This task follows the implementation of `task-286-314-filter-swarm-item-calls-impl`. The implementation must correctly map `wSwarmFlags`, `wDailyPhoneItemFlags`, and `wDailyPhoneTimeOfDayFlags`.

### Crucial Architectural Enforcement (Must Read!)
- **REJECT INLINE MAGIC NUMBERS:** You are required to strictly enforce the rule against inline magic numbers. All memory offsets, lengths, bit locations, and shifts must be defined as reusable constants at the module level. **If you find any magic numbers in the implemented logic, you MUST reject the PR.**
- **Handling Failures/Rejections:** If you must reject the implementation, update the **TARGET task's** (the `impl` task) YAML frontmatter to `status: FAILED`, increment its `rejection_count`, add a `rejection_reason`, and uncheck its Acceptance Criteria. **DO NOT** modify this QA task's YAML. Instead, note the failure in this markdown body and document it in `.foundry/journals/qa.md`.
- **Empty PR Policy:** If you verify the implementation is correct and must submit an empty PR to transition this node, you **MUST check off all Acceptance Criteria checkboxes** below before submitting.

## Acceptance Criteria
- [ ] Verify that logic correctly identifies swarm-related callers based on `wSwarmFlags`.
- [ ] Verify that logic correctly identifies item-giving callers based on `wDailyPhoneItemFlags`.
- [ ] Verify that a filtering mechanism or flag correctly distinguishes high-value calls.
- [ ] **ARCHITECTURAL CHECK:** Verify that NO inline magic numbers are used for memory offsets, lengths, or bitwise operations. All such values must be extracted into module-level constants.

### Rejections
- **2026-07-30**: Rejected `task-286-314-filter-swarm-item-calls-impl`. The implementation is completely missing from the codebase. The previous coder submitted an empty PR due to missing offsets, but even with research complete, no code exists to extract `wSwarmFlags` or `wDailyPhoneItemFlags`.
