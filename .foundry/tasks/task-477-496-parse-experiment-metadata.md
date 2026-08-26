---
id: task-477-496-parse-experiment-metadata
type: TASK
title: Parse Experiment Metadata
status: ACTIVE
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '13062076435337391241'
parent: story-412-477-detect-experiment-metadata
rejection_reason: ''
---
# Parse Experiment Metadata

## Objective
Update frontmatter parsing to extract experiment metadata.

## Scope
- Extract `experiment_variants` field in node frontmatter.
- Validate against `NodeFrontmatterSchema`.

## Acceptance Criteria
- [ ] Add `experiment_variants` to Zod schema in `schema.ts`.
- [ ] Add parsing logic to gray-matter extraction in `foundry-orchestrator.ts`.
