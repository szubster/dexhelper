---
id: task-477-497-expose-experiment-metadata
type: TASK
title: Expose Experiment Metadata
status: ACTIVE
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-27'
depends_on:
  - task-477-496-parse-experiment-metadata
jules_session_id: '14342483089304995589'
parent: story-412-477-detect-experiment-metadata
rejection_reason: ''
---
# Expose Experiment Metadata

## Objective
Expose parsed experiment metadata to the dispatch engine.

## Scope
- Ensure parsed variants are passed along with node definitions.
- Update `ParsedNode` interface and usage.

## Acceptance Criteria
- [ ] Update `ParsedNode` to correctly hold the validated frontmatter including experiments.
- [ ] Ensure the generated JSON output matrix includes the experiment variants.
