---
id: story-006-scheduling-configuration
type: STORY
title: "Scheduling Configuration"
status: READY
owner_persona: tech_lead
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/stories/story-004-generic-scheduling-workflow.md
jules_session_id: null
parent: .foundry/epics/epic-004-generic-agent-scheduling.md
---

# Scheduling Configuration

Define a configuration mechanism (e.g., a `.yml` config file or a registry within `.github/workflows/`) that allows easy addition of new scheduled agents with their respective cron expressions. This addresses the configurability requirement.