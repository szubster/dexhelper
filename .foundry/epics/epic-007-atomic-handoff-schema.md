---
id: "epic-007-atomic-handoff-schema"
type: "EPIC"
title: "Epic: Atomic Handoff Schema & Documentation"
status: "COMPLETED"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: null
parent: "./prds/prd-001-v2-lifecycle
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Epic: Atomic Handoff Schema & Documentation

## Overview
This Epic covers the required updates to the `./docs/schema.md` and related architecture documentation to formally support the "Atomic Handoffs" paradigm, transitioning away from "Composite Nodes".

## Prerequisites
- Understanding of current `./docs/schema.md`
- Read `./prds/prd-001-v2-lifecycle.md`

## Acceptance Criteria
- [x] `schema.md` is updated to explicitly define the single-owner invariant per node.
- [x] Examples in documentation reflect the new atomic file structure.
- [x] Any references to "composite nodes" are removed or marked deprecated.

### Generated Stories
- `./stories/story-007-schema-invariant.md`
- `./stories/story-008-schema-examples.md`
- `./stories/story-009-composite-deprecation.md`
