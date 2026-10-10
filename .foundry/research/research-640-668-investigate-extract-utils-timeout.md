---
id: research-640-668-investigate-extract-utils-timeout
type: RESEARCH
title: Investigate timeout during utils extraction
status: READY
owner_persona: researcher
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-526-640-extract-domain-logic
tags:
  - architecture
  - monorepo
  - pnpm
rejection_count: 0
rejection_reason: ''
research_references: []
notes: ''
locks: []
---

# Investigate timeout during utils extraction

## Context
The task `task-640-659-extract-utils-to-core` failed permanently after reaching its max rejection count. We need to investigate why this occurred before attempting further extraction.

## Acceptance Criteria
- [x] Determine the root cause of the timeout/failure during the utils extraction task.
- [x] Provide actionable recommendations for the replacement task to avoid failing again.

## Findings

The root cause of the timeout is a false permanent failure. The task `task-640-659-extract-utils-to-core` repeatedly failed with `[ACKNOWLEDGED] Session terminated with state: COMPLETED` which indicates a system-level crash or failure to explicitly invoke the `submit` tool to open a Pull Request. This falsely incremented the rejection count until it hit the maximum limit.

## Recommendations

1. Ensure the replacement task explicitly instructs the assigned coder to always use the `submit` tool to finalize their work and open a PR, even if no file changes were made (Empty PR Policy).
