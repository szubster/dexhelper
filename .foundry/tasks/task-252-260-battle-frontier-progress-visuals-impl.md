---
id: task-252-260-battle-frontier-progress-visuals-impl
type: TASK
title: Battle Frontier Brain Progress Visuals Impl
status: PENDING
owner_persona: coder
created_at: '2026-07-04'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-079-252-battle-frontier-brain-progress-visuals
tags:
  - feature
  - gen3
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Battle Frontier Brain Progress Visuals Impl

## Description
Implement progress visuals towards the next Frontier Brain encounter using React Flow (ADR 008) in the `BattleFrontierDashboard`. This requires calculating the remaining streak count required to reach the next symbol threshold based on the data in `.foundry/docs/knowledge_base/gen3_battle_frontier_data.md` and visually rendering it.

## Implementation Guidelines
- **Strict Aesthetic Constraints (ADR 024):** The UI component MUST strictly adhere to the tactical hardware/snooping aesthetic. Use sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Leverage existing `tactical-*` utility classes.
- **Graph Dependencies (ADR 008):** Use `React Flow` to maintain architectural consistency. Scaffolding for a React Context layer may be required.
- **Save File Parsing:** Explicitly use reusable constants for memory offsets, lengths, bit locations, and shifts at the module level, strictly avoiding inline magic numbers.

## Rejection & Completion Guidelines
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- **Empty PR Policy:** If you submit an empty PR because the UI module is already fully implemented, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Implement `React Flow` progress graph showing remaining streak required for next Frontier Brain encounter.
- [ ] Define reusable constants for encounter thresholds from `gen3_battle_frontier_data.md`.
- [ ] Apply tactical styling constraints (ADR 024).