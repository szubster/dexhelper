---
id: prd-531-587-automatic-scratchpad-cleanup-guard
type: PRD
title: Automatic Developer Scratchpad Cleanup Guard in Pre-Commit Hook
status: PENDING
owner_persona: epic_planner
created_at: '2026-10-14'
updated_at: '2026-10-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-531-automatic-scratchpad-cleanup-guard
tags:
  - foundry
  - process
  - git-hooks
  - lint
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Automatic Developer Scratchpad Cleanup Guard in Pre-Commit Hook

## Context
Developers and autonomous AI agents frequently create temporary scratchpad files, bash scripts (e.g., `generate_reads.sh`, `test_script.sh`), or temporary node scripts during exploration and debug phases. While `core_policies.md` explicitly mandates the deletion of scratchpad files before submitting a PR, agents occasionally forget to clean them up, leading to untracked or staged scratchpad pollution at the repository root and subsequent code review rejections.

This proposal introduces an automated linter check / pre-commit hook rule that detects non-standard root-level script or temporary text files (or uncommitted scratchpad artifacts) and automatically fails pre-commit checks or cleans them up prior to PR submission.

## Requirements
- **Root Scratchpad Detector:** Implement a mechanism to detect uncommitted, ephemeral scratchpad files at the repository root (e.g., `*.sh`, `*.cjs`, `*.js`, `*.md` outside allowed paths/docs).
- **Enforcement Mechanism:** Integrate this detection into the `pnpm lint` command and/or Lefthook pre-commit hooks to block PR submissions if temporary files are present.
- **Auto-Cleanup (Optional/Conditional):** Explore options to automatically `rm` detected temporary files during the pre-commit phase, provided it can be done safely without deleting legitimate new files.
- **Testing:** Include unit/integration tests verifying that creating an ephemeral debug script outside allowed paths correctly triggers a linting error or auto-cleanup.

## Constraints
- The solution must not interfere with legitimate development scripts residing in designated directories (e.g., `packages/foundry/scripts/`, `.github/scripts/`).
- Detection logic should be robust against false positives (e.g., legitimate root files like `package.json`, `README.md`, `lefthook.yml`).
- Must run fast enough not to significantly slow down the pre-commit workflow.

## Acceptance Criteria
- [ ] epic-587-584-root-scratchpad-detector-script
- [ ] epic-587-585-scratchpad-detector-testing
- [ ] epic-587-586-scratchpad-detector-integration
- [x] Implement a root scratchpad detector in `.github/scripts/` or Biome/Oxlint/Lefthook rules.
- [x] Add tests verifying that ephemeral debug scripts outside allowed paths trigger a linting error or auto-cleanup.
- [x] Integrate into `pnpm lint` and git pre-commit hooks.
- [x] Ensure orchestrator macro node completion safeguard: An integration/E2E EPIC breakdown requirement is met.
