---
id: idea-638-automated-journal-timestamp-validator
title: Automated Journal Timestamp Naming Validator
type: IDEA
status: READY
owner_persona: product_manager
---

# Automated Journal Timestamp Naming Validator

## Overview
Recent audits of agent journals across `.foundry/journals/` and `.jules/` revealed occasional drift where agents either log to non-compliant filenames or monolithic log files, bypassing the timestamped private memory policy (`YYYY-MM-DD-HH-MM-SS.md`). To enforce strict compliance with `.foundry/docs/knowledge_base/agents/core_policies.md` and prevent context bloat/unstructured logs, this idea proposes implementing an automated linter/script within `.github/scripts/` that validates journal file naming formats and flags or fails non-compliant entries during CI or pre-commit checks.

## Key Objectives
- Develop an automated validation utility in `.github/scripts/` (e.g. `validate-journal-timestamps.ts`).
- Ensure all newly created files in `.foundry/journals/<persona>/` and `.jules/<persona>/` match the exact regex pattern `^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}\.md$` or allowed master/summary files.
- Integrate the check into pre-commit / `pnpm lint` workflows to catch non-compliant journal entries before merging.

## Acceptance Criteria
- [ ] Create a PRD for automated journal timestamp validation and linter integration.
