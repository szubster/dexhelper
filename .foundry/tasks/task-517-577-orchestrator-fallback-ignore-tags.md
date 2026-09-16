---
id: task-517-577-orchestrator-fallback-ignore-tags
type: TASK
title: Orchestrator Fallback Ignore Missing Tags
status: ACTIVE
owner_persona: coder
created_at: '2026-09-13'
updated_at: '2026-09-16'
depends_on: []
jules_session_id: '4372484867831063935'
pr_number: null
parent: story-418-517-orchestrator-fallback-mechanisms
tags:
  - foundry
  - orchestrator
  - tags
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
experiment_variants: []
locks: []
---

# Orchestrator Fallback Ignore Missing Tags

## Description
Update the orchestrator's prompt compilation to gracefully ignore missing tag-specific fragments (layers) instead of throwing an error or failing.

## Acceptance Criteria
- [x] Update \`compilePromptForNode\` to log a warning when a requested tag/layer file does not exist, and continue processing without throwing an error.
- [x] Ensure that existing valid tags are still appended correctly.
- [x] Write or update unit tests to verify that missing tags are gracefully ignored and logged as warnings.
