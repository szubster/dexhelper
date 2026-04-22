---
id: "epic-004-generic-agent-scheduling"
type: "EPIC"
title: "Generic Agent Scheduling"
status: "ACTIVE"
owner_persona: "story_owner"
created_at: "2026-04-21"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: "11192437546077218061"
parent: ".foundry/prds/prd-001-agent-scheduling.md"
tags: ["infrastructure"]
rejection_count: 0
notes: ""
---

# Generic Agent Scheduling

## Objective
Implement a generic, robust mechanism for scheduling autonomous agents within the Foundry architecture.

## Details
This epic covers the creation of a generic GitHub Actions workflow or a cron-based solution that can be used to trigger scheduled agents.
The implementation must handle empty results gracefully without failing or spamming logs (e.g., when an agent's query returns no actionable work).
The scheduling mechanism should be configurable to easily accommodate adding new scheduled agents, and it must support standard cron expressions.
Scheduled agents should execute using standard Jules prompt hydration logic.

## Prerequisites
- None.

## Acceptance Criteria
- [ ] A generic scheduling implementation is defined and documented.
- [ ] Tests confirm that the scheduled run exits successfully when there is no work to do.

## Notes
- Created stories: `story-004-generic-scheduling-workflow.md`, `story-005-empty-state-handling.md`, `story-006-scheduling-configuration.md`.
