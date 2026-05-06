---
id: prd-016-016-precommit-schema-validation
type: PRD
title: Pre-commit Schema Validation
status: "COMPLETED"
owner_persona: architect
created_at: '2026-05-05'
updated_at: "2026-05-05"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/ideas/idea-016-precommit-schema-validation.md
tags:
  - foundry
  - dag
  - orchestrator
  - validation
---

# PRD: Pre-commit Schema Validation

## Context & Problem
Currently, malformed Foundry nodes (e.g. missing required YAML frontmatter fields, invalid `owner_persona`, invalid `status`, or invalid `type` enums) can be committed to the repository. The DAG orchestrator handles schema validation during its dispatch cycle, skipping malformed nodes and logging warnings. However, this clutters the repository history with invalid files and delays the detection of these errors, forcing asynchronous discovery and fix cycles.

## Proposal
Expand the existing Git pre-commit hooks (managed by `lefthook`) to include full YAML frontmatter schema validation against the rules defined in `.foundry/docs/schema.md`. This will catch errors at commit time, providing immediate synchronous feedback and preventing malformed nodes from entering the repository.

## Requirements
1. **Validation Script**: Create or update a script (e.g., `scripts/validate-foundry-schema.ts` or modifying `scripts/validate-foundry-ids.ts`) to validate the frontmatter of all staged `.foundry/**/*.md` files.
2. **Schema Enforcement**:
   - The `type` must be one of: `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`.
   - The `status` must be one of: `PENDING`, `READY`, `ACTIVE`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`.
   - The `owner_persona` must be exactly one string from the allowed list: `product_manager`, `epic_planner`, `story_owner`, `architect`, `tech_lead`, `coder`, `qa`, `human`, `tpm`, `agile_coach`, `researcher`.
   - Required fields (`id`, `title`, `created_at`, `updated_at`, `depends_on`, `jules_session_id`) must be present.
3. **Lefthook Integration**: Update `lefthook.yml` to run this validation script on `pre-commit` against `{staged_files}`.
4. **Library Dependency**: Use `gray-matter` for parsing frontmatter as per ADR-006.

## Non-Goals
- We are not validating the markdown body content or structure beyond the required `id` slug formats (which is already covered by `validate-foundry-ids.ts`).
- We are not implementing automated formatting/fixing of malformed nodes at commit time; the script should only check and fail the commit with clear error messages.

## Acceptance Criteria
- [x] A validation script exists that correctly identifies invalid `owner_persona`, `status`, and `type` enums.
- [x] The script correctly identifies missing required fields.
- [x] `lefthook.yml` is updated to run this validation during `pre-commit`.
- [x] Staging a malformed Foundry node and attempting to commit results in a blocked commit with a clear error message.
- [x] Staging a valid Foundry node allows the commit to proceed.
