---
id: story-005-013-tpm-archiving-logic
type: STORY
title: "TPM Archiving Logic"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-23"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: "12682969154199172711"
parent: .foundry/epics/epic-005-tpm-agent-scheduling.md
tags: ["infrastructure"]
rejection_count: 0
notes: ""
---

# TPM Archiving Logic

Implement logic in the TPM agent (`.github/agents/tpm.md` or a related task/script) to successfully identify and archive at least one test `COMPLETED` node when present.

**Note:** The TPM agent should be designed to be conservative when archiving. Even if a node is marked `COMPLETED`, if the TPM determines it might still be relevant or needed, it should retain it. It's better to leave more nodes unarchived than to aggressively remove nodes that might still have value.
