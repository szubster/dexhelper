---
id: "epic-007-atomic-handoff-schema"
type: "EPIC"
title: "Epic: Atomic Handoff Schema & Documentation"
status: "ACTIVE"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on:
  - .foundry/prds/prd-001-v2-lifecycle.md
jules_session_id: "498764716216328200"
parent: ".foundry/prds/prd-001-v2-lifecycle.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Epic: Atomic Handoff Schema & Documentation

## Overview
This Epic covers the required updates to the `.foundry/docs/schema.md` and related architecture documentation to formally support the "Atomic Handoffs" paradigm, transitioning away from "Composite Nodes".

## Prerequisites
- Understanding of current `.foundry/docs/schema.md`
- Read `.foundry/prds/prd-001-v2-lifecycle.md`

## Acceptance Criteria
- [ ] `schema.md` is updated to explicitly define the single-owner invariant per node.
- [ ] Examples in documentation reflect the new atomic file structure.
- [ ] Any references to "composite nodes" are removed or marked deprecated.
