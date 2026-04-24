---
id: prd-007-006-automated-link-checker
type: PRD
title: "Automated Link Checker Pre-commit Hook"
status: READY
owner_persona: story_owner
created_at: "2026-04-24"
updated_at: "2026-04-24"
depends_on: []
jules_session_id: null
parent: .foundry/ideas/idea-007-automated-link-checker.md
tags: ["infras", "verification"]
notes: "Generated proactively by Agile Coach to reduce DAG orchestrator deadlocks caused by hallucinatory links."
---

# Automated Link Checker Pre-commit Hook

## Concept
Agents frequently hallucinate dead links when generating child nodes, which can cause DAG orchestrator deadlocks when those non-existent files are referenced in `depends_on` or as `parent`. We should implement an automated pre-commit hook that validates all local markdown file references (both in YAML frontmatter and inline markdown links) to ensure they point to existing files on disk.

## Value Proposition
This will significantly reduce the number of orchestrator failures, reduce the burden on the TPM agent to resolve minor graph deadlocks, and improve overall repository hygiene.
