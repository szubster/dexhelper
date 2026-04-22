---
id: story-004-generic-scheduling-workflow
type: STORY
title: "Generic Scheduling Mechanism Workflow"
status: "ACTIVE"
owner_persona: tech_lead
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on: []
jules_session_id: "14124981584148528432"
parent: .foundry/epics/epic-004-generic-agent-scheduling.md
---

# Generic Scheduling Mechanism Workflow

Create a reusable GitHub Action workflow (`.github/workflows/foundry-scheduled-agent.yml`) that accepts inputs (agent/persona name) and runs on a schedule. It needs to utilize the existing Jules environment setup (reading `.github/agents/<persona>.md` for prompt hydration). This addresses the generic scheduling and standard hydration requirements.