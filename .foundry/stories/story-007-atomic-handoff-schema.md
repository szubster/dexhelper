---
id: "story-007-atomic-handoff-schema"
type: "STORY"
title: "Story: Update schema.md for Atomic Handoffs"
status: "PENDING"
owner_persona: "tech_lead"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: null
parent: ".foundry/epics/epic-007-atomic-handoff-schema.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Story: Update schema.md for Atomic Handoffs

## Overview
This story entails updating `.foundry/docs/schema.md` to reflect the Atomic Handoffs paradigm described in `prd-001-v2-lifecycle.md` and related epics.

## Acceptance Criteria
- [ ] `schema.md` explicitly defines the single-owner invariant per node (no "Composite Nodes").
- [ ] Examples of nodes in the documentation reflect the new atomic file structure and workflow transitions.
- [ ] Any existing references to "composite nodes" are removed or marked as deprecated.
