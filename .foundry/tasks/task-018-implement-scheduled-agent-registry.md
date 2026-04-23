---
id: task-018-implement-scheduled-agent-registry
type: TASK
title: "Implement Scheduled Agent Registry"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-22"
updated_at: "2026-04-23"
depends_on: []
jules_session_id: "12059888989811248189"
parent: .foundry/stories/story-006-scheduling-configuration.md
tags: ["infrastructure"]
rejection_count: 1
notes: ""
---

# Implement Scheduled Agent Registry

Create individual GitHub Actions workflow files for scheduled agents that invoke the reusable `foundry-scheduled-agent.yml` workflow.

## Technical Blueprint

1. **TPM Workflow**:
   - Create `.github/workflows/schedule-tpm.yml`.
   - Set a cron schedule (e.g., hourly `0 * * * *`).
   - Call the `foundry-scheduled-agent.yml` workflow and pass `persona: "tpm"`.

2. **Agile Coach Workflow**:
   - Create `.github/workflows/schedule-agile-coach.yml`.
   - Set a cron schedule (e.g., daily `0 0 * * *`).
   - Call the `foundry-scheduled-agent.yml` workflow and pass `persona: "agile_coach"`.

## Acceptance Criteria
- [ ] `.github/workflows/schedule-tpm.yml` exists and has an hourly cron schedule.
- [ ] `.github/workflows/schedule-agile-coach.yml` exists and has a daily cron schedule.
- [ ] Both workflows correctly invoke `foundry-scheduled-agent.yml` with the correct inputs.

*Verification*: This is a low-risk, declarative infrastructure task. The `coder` must verify the YAML syntax is correct and document completion in their journal. No separate QA task is required (Intelligent Verification Protocol: Self-verify).
