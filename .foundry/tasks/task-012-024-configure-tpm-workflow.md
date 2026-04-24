---
id: task-012-024-configure-tpm-workflow
type: TASK
title: "Configure TPM Schedule Workflow"
status: "COMPLETED"
owner_persona: coder
created_at: "2026-04-23"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: .foundry/stories/story-005-012-configure-tpm-schedule.md
tags: ["infrastructure"]
rejection_count: 0
notes: ""
---

# Configure TPM Schedule Workflow

## Objective
Configure the TPM agent to run on a daily schedule utilizing the generic scheduled agent workflow.

## Details
This task will configure the scheduled workflow for the `tpm` persona. The target file is `.github/workflows/schedule-tpm.yml`. The workflow needs to define a daily cron schedule (`0 0 * * *`) and call the reusable workflow `.github/workflows/foundry-scheduled-agent.yml` passing `persona: "tpm"`.

## Requirements
- Edit `.github/workflows/schedule-tpm.yml`.
- Ensure it uses `on: schedule: - cron: "0 0 * * *"` and `workflow_dispatch:`.
- Ensure it properly calls `.github/workflows/foundry-scheduled-agent.yml` with `persona: "tpm"`.

## Verification
- Run `pnpm test --dir .github/scripts/` to ensure no orchestrator tests are broken.
- Ensure the GitHub action file is valid YAML.
- Since this is a simple low-risk workflow configuration change, a separate QA task is not needed. The `coder` can self-verify by checking the YAML syntax and test outputs.

## Acceptance Criteria
- [x] `.github/workflows/schedule-tpm.yml` is correctly configured to run daily.
- [x] The workflow successfully invokes the generic scheduled agent workflow for the TPM persona.
