---
id: "epic-008-atomic-handoff-orchestrator"
type: "EPIC"
title: "Epic: Orchestrator Script Refactor for Atomic Handoffs"
status: "ACTIVE"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-25"
depends_on:
  - .foundry/prds/prd-001-v2-lifecycle.md
  - .foundry/epics/epic-007-atomic-handoff-schema.md
jules_session_id: "9786283728722449156"
parent: ".foundry/prds/prd-001-v2-lifecycle.md"
tags: ["v2-architecture", "lifecycle", "atomic-handoffs"]
---

# Epic: Orchestrator Script Refactor for Atomic Handoffs

## Overview
This Epic handles modifying orchestrator scripts to strictly enforce the atomic, single-persona rule and manage dependencies correctly without deadlocking.

## Prerequisites
- Completion of Schema Updates (`.foundry/epics/epic-007-atomic-handoff-schema.md`)
- Read `.foundry/prds/prd-001-v2-lifecycle.md`

## Acceptance Criteria
- [ ] Orchestrator explicitly rejects or errors on files defining multiple `owner_persona`s.
- [ ] Orchestrator correctly marks nodes `COMPLETED` when their respective GitHub PR is merged.
- [ ] DAG resolves without deadlocks given atomic files depending on one another.
