---
id: "epic-005-tpm-agent-scheduling"
type: "EPIC"
title: "TPM Agent Scheduling"
status: "COMPLETED"
owner_persona: "story_owner"
created_at: "2026-04-21"
updated_at: "2026-04-23"
depends_on:
  - ".foundry/epics/epic-004-generic-agent-scheduling.md"
jules_session_id: null
parent: ".foundry/prds/prd-001-agent-scheduling.md"
tags: ["infrastructure"]
rejection_count: 1
notes: ""
---

# TPM Agent Scheduling

## Objective
Implement scheduling for the Technical Program Manager (TPM) persona.

## Details
This epic covers the integration of the TPM agent (`.github/agents/tpm.md`) with the new generic scheduling mechanism.
The TPM agent must be configured to run on an hourly schedule. It should be capable of scanning the `.foundry/` monofolder for `COMPLETED` nodes.
When found, the TPM agent will move them to an archive structure or clean them up according to established TPM rules.
This will serve as the first implementation of the scheduled agents system.

## Prerequisites
- Generic scheduling mechanism (Epic `epic-004-generic-agent-scheduling`) must be implemented.

## Acceptance Criteria
- [x] The TPM agent is scheduled to run hourly.
- [x] The TPM agent successfully archives at least one test `COMPLETED` node when present.

### Generated Stories
- .foundry/stories/story-005-012-configure-tpm-schedule.md
- .foundry/stories/story-005-013-tpm-archiving-logic.md
