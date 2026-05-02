---
id: "epic-008-atomic-handoff-orchestrator"
type: "EPIC"
title: "Epic: Orchestrator Script Refactor for Atomic Handoffs"
status: "COMPLETED"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-26"
depends_on:
  - .foundry/archive/epics/epic-007-atomic-handoff-schema.md
jules_session_id: null
parent: ".foundry/prds/prd-001-v2-lifecycle.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Epic: Orchestrator Script Refactor for Atomic Handoffs

## Overview
This Epic handles modifying orchestrator scripts to strictly enforce the atomic, single-persona rule and manage dependencies correctly without deadlocking.

## Prerequisites
- Completion of Schema Updates (`.foundry/archive/epics/epic-007-atomic-handoff-schema.md`)
- Read `.foundry/prds/prd-001-v2-lifecycle.md`

## Acceptance Criteria
- [x] Orchestrator explicitly rejects or errors on files defining multiple `owner_persona`s.
- [x] Orchestrator correctly marks nodes `COMPLETED` when their respective GitHub PR is merged.
- [x] DAG resolves without deadlocks given atomic files depending on one another.

### Generated Stories
- `.foundry/stories/story-008-023-validate-single-owner.md`
- `.foundry/stories/story-008-024-update-status-on-merge.md`
- `.foundry/stories/story-008-025-verify-dag-resolution.md`
