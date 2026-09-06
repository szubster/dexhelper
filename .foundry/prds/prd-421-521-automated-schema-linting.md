---
id: prd-421-521-automated-schema-linting
type: PRD
title: "Automated Markdown Schema Validation via Biome or Custom CLI"
status: READY
owner_persona: epic_planner
created_at: "2026-08-24"
updated_at: "2026-08-24"
depends_on: []
jules_session_id: null
parent: idea-421-automated-schema-linting
tags:
  - foundry
  - linting
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Automated Markdown Schema Validation via Biome or Custom CLI

## Summary
The Foundry relies heavily on strict markdown file structures, primarily the YAML frontmatter and the exact formatting of Acceptance Criteria checkboxes (`- [ ]`). Minor formatting drift causes false negatives in automated QA checks and orchestrator transition failures. This PRD details the requirements for a custom CLI tool (or script) hooked into `lefthook` to enforce these constraints as a pre-commit check.

## Objectives
- Enforce strict YAML frontmatter validation against `.foundry/docs/schema.md`.
- Enforce exact markdown checkbox syntax (`- [ ] ` or `- [x] `).
- Fail fast locally (via `lefthook` pre-commit) before CI or agents waste cycles.

## Non-Goals
- Complex semantic analysis of node content.
- Automatic fix/repair of complex DAG dependency cycles (linting only).

## Requirements

### 1. Schema Linter Script
- **Language**: TypeScript (running via `tsx` or standard Node).
- **Location**: `.foundry/scripts/lint-schema.ts`.
- **Target**: Iterates over all `.md` files in `.foundry/ideas/`, `.foundry/prds/`, `.foundry/epics/`, `.foundry/stories/`, and `.foundry/tasks/`. (Ignores `docs/` and `journals/`).

### 2. Validation Rules
- **Frontmatter Fields**: Must contain all required keys (`id`, `type`, `title`, `status`, `owner_persona`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`).
- **Enum Strictness**:
  - `status` must be one of: `PENDING`, `READY`, `ACTIVE`, `VERIFYING`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`.
  - `owner_persona` must be valid per `schema.md`.
  - `type` must match the parent directory (e.g., tasks in `tasks/` must have `type: TASK`).
- **Markdown Body Strictness**:
  - Checkboxes MUST be exactly `- [ ] ` or `- [x] `.
  - If a file has checkboxes, they must ideally be under an `## Acceptance Criteria` header.

### 3. Pre-commit Integration
- Integrate the script into `lefthook.yml` so it runs automatically on `git commit`.

## Acceptance Criteria
- [ ] Implement `.foundry/scripts/lint-schema.ts` to validate frontmatter and checkbox syntax.
- [ ] Add the script to `lefthook.yml` under the `pre-commit` hook.
- [ ] Ensure `pnpm lint:foundry` or similar command exists in `package.json` for manual execution.
- [ ] Validate the script correctly fails on malformed files and passes on valid files.
