---
id: story-412-477-detect-experiment-metadata
type: STORY
title: Detect Experiment Metadata in Orchestrator
status: READY
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-08-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-340-412-orchestrator-parallel-execution
tags:
  - orchestrator
  - parsing
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Detect Experiment Metadata in Orchestrator

## Objective
Update the orchestrator's node parsing logic to detect and validate experiment variant metadata.

## Scope
1. Parse experiment and variant fields in node frontmatter.
2. Validate against schema.
3. Expose parsed metadata to the dispatch engine.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-477-496-parse-experiment-metadata
- [ ] task-477-497-expose-experiment-metadata
