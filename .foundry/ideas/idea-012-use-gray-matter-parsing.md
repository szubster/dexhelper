---
id: idea-012-use-gray-matter-parsing
type: IDEA
title: "Replace Regex Manipulations with Gray-Matter parsing"
status: "ACTIVE"
owner_persona: product_manager
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: "15907586296043811054"
parent: null
tags: ["foundry", "parsing", "gray-matter", "maintenance"]
notes: ""
---

# Idea: Replace Regex Manipulations with Gray-Matter parsing

## Context
Regex manipulations of markdown and frontmatter are becoming increasingly fragile.

## Proposal
Use `gray-matter` for parsing markdown files to ensure robustness and correctness. Formatting changes might be an issue, but they are less of an issue compared to complicated code and brittleness.

## Impact
Better code maintainability, less bugs, robust node parsing in Foundry.
