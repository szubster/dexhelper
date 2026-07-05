---
id: task-252-261-battle-frontier-progress-visuals-qa
type: TASK
title: Battle Frontier Brain Progress Visuals QA
status: READY
owner_persona: qa
created_at: '2026-07-04'
updated_at: '2026-07-05'
depends_on:
  - task-252-260-battle-frontier-progress-visuals-impl
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

# Task: Battle Frontier Brain Progress Visuals QA

## Description
Verify the implementation of the `BattleFrontierDashboard` progress visuals. Ensure the remaining streak calculation is correct according to the knowledge base and that `React Flow` correctly visualizes the distance to the next Frontier Brain encounter while adhering to the tactical aesthetic.

## Verification Guidelines
- Verify the components use `React Flow`.
- Verify the components adhere strictly to the tactical styling constraints (`rounded-none`, `border-dashed`, etc.).
- Verify the correct encounter thresholds are applied for each of the 7 facilities based on `.foundry/docs/knowledge_base/gen3_battle_frontier_data.md`.
- **Transient Failures:** If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- **Permanent Failures:** If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.

## Acceptance Criteria
- [ ] Visuals tested to accurately show distance to Silver and Gold threshold based on current streak.
- [ ] Tactical hardware aesthetic verified.
- [ ] Reusable constants verified against magic numbers.
