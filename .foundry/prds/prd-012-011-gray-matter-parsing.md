---
id: prd-012-011-gray-matter-parsing
type: PRD
title: "PRD: Replace Regex Manipulations with Gray-Matter parsing"
status: "ACTIVE"
owner_persona: "architect"
created_at: "2026-05-01"
updated_at: "2026-05-02"
depends_on: []
jules_session_id: "12178215561962749974"
parent: ".foundry/ideas/idea-012-use-gray-matter-parsing.md"
tags: ["foundry", "parsing", "gray-matter", "maintenance"]
notes: ""
---

# PRD: Replace Regex Manipulations with Gray-Matter parsing

## Overview
Regex manipulations of markdown and frontmatter are becoming increasingly fragile. The system should use `gray-matter` for parsing markdown files to ensure robustness and correctness. Formatting changes from serialization are a known trade-off but are less of an issue compared to complicated code and brittleness.

## Requirements
- Integrate `gray-matter` for parsing markdown files.
- Replace existing regex-based parsers with `gray-matter`.
- Ensure the DAG orchestrator properly uses the new parsing logic.
