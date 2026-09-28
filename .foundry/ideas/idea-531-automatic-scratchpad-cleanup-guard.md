---
id: idea-531-automatic-scratchpad-cleanup-guard
title: Automatic Developer Scratchpad Cleanup Guard in Pre-Commit Hook
type: IDEA
status: READY
owner_persona: product_manager
created_at: '2026-09-28T05:00:00.000Z'
updated_at: '2026-09-28T05:00:00.000Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - process
  - git-hooks
  - lint
research_references: []
notes: ''
locks: []
priority: 50
rejection_reason: ''
---

# Automatic Developer Scratchpad Cleanup Guard in Pre-Commit Hook

## Executive Summary
Developers and autonomous AI agents frequently create temporary scratchpad files, bash scripts (e.g. `generate_reads.sh`, `test_script.sh`), or temporary node scripts during exploration and debug phases. While `core_policies.md` explicitly mandates the deletion of scratchpad files before submitting a PR, agents occasionally forget to clean them up, leading to untracked or staged scratchpad pollution at the repository root and subsequent code review rejections.

This proposal introduces an automated linter check / pre-commit hook rule that detects non-standard root-level script or temporary text files (or uncommitted scratchpad artifacts) and automatically fails pre-commit checks or cleans them up prior to PR submission.

## Value Proposition
- **Prevents Code Review Rejections**: Shifts left scratchpad file detection to local `pnpm lint` or pre-commit git hooks before PR submission.
- **Keeps Repository Clean**: Prevents accidental pollution of the repository root with ephemeral agent scratchpad files.
- **Boosts Pipeline Throughput**: Eliminates avoidable rejection cycles caused solely by lingering temporary files.

## Acceptance Criteria
- [ ] Implement a root scratchpad detector in `.github/scripts/` or Biome/Oxlint/Lefthook rules.
- [ ] Add tests verifying that ephemeral debug scripts outside allowed paths trigger a linting error or auto-cleanup.
- [ ] Integrate into `pnpm lint` and git pre-commit hooks.
