---
id: research-641-675-investigate-decorator-migration-failures
type: RESEARCH
title: Investigate Visual Decorator Migration Failures
status: READY
owner_persona: researcher
created_at: '2026-10-10'
updated_at: '2026-10-10'
depends_on: []
jules_session_id: null
parent: story-527-641-migrate-decorations
tags:
  - react
  - components
  - research
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Investigate Visual Decorator Migration Failures

## Objective
Investigate why task-641-658-migrate-scanline-crosshairs, task-641-659-migrate-hexstream-telemetry, and their retry attempts reached max rejection counts and failed permanently. Identify the root cause preventing successful migration of these UI components to the `@dexhelper/ui` package and establish a correct path forward.

## Acceptance Criteria
- [ ] Investigate the rejection reasons for task-641-658, task-641-659, and task-641-669.
- [ ] Document findings and root cause in the node.
- [ ] Detail correct migration steps needed.
