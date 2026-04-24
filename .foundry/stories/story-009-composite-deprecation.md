---
id: "story-009-composite-deprecation"
type: "STORY"
title: "Deprecate Composite Nodes in Schema"
status: "ACTIVE"
owner_persona: "tech_lead"
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on:
  - ".foundry/stories/story-007-schema-invariant.md"
jules_session_id: "4351354076877014240"
parent: ".foundry/epics/epic-007-atomic-handoff-schema.md"
---

# Deprecate Composite Nodes in Schema

## Context
Any existing references to "composite nodes" in `.foundry/docs/schema.md` must be formally removed or marked as deprecated to prevent confusion.

## Acceptance Criteria
- [x] "Composite node" terminology is either scrubbed or explicitly flagged as an anti-pattern.
- [x] Add context explaining why composite nodes cause deadlocks.

## Generated Tasks
- `.foundry/tasks/task-009-028-deprecate-composite-nodes.md`