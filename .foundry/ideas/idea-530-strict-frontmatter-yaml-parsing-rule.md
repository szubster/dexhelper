---
id: idea-530-strict-frontmatter-yaml-parsing-rule
type: IDEA
title: Strict Frontmatter Isolation in Markdown Parsing Utilities
status: READY
owner_persona: product_manager
created_at: '2026-09-25'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - linting
  - parsing
  - quality
research_references: []
notes: ''
locks: []
priority: 50
rejection_reason: ''
---

# Strict Frontmatter Isolation in Markdown Parsing Utilities

## Problem Statement
Recent QA session analysis identified that utility scripts and automation tools processing `.foundry` markdown files often use global regex matches (such as `content.match(/^status:\s*(ACTIVE|PENDING|READY)\s*$/m)`) directly on the raw file content. This creates subtle bugs when markdown descriptions or acceptance criteria text contain target metadata strings (such as `status:` or `depends_on:`), causing scripts to misread file states or trigger unintended side-effects on completed nodes.

## Proposed Solution
Establish system-wide rules and tooling to enforce strict YAML frontmatter isolation:
1. Mandate that all utility scripts and parsers processing `.foundry` markdown files must first isolate the YAML frontmatter block (e.g., by splitting on `---` boundaries or using `gray-matter`) before parsing metadata.
2. Introduce a linter check or utility helper in `.github/scripts/` (e.g., `parseFoundryNode`) that standardizes frontmatter extraction across all orchestrator and build scripts.

## Expected Impact
- Prevents erroneous state evaluation in DAG utilities and test runners caused by false-positive regex matches in markdown body text.
- Standardizes frontmatter parsing across all scripts in the Foundry ecosystem.
