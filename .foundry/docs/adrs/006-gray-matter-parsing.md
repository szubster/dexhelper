# ADR 006: Gray-Matter Markdown Parsing Migration

## Status
Accepted

## Context
The Foundry system heavily relies on parsing Markdown files with YAML frontmatter to determine the Directed Acyclic Graph (DAG) state and workflow progression. Historically, we have used custom Regex manipulations (`/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/m`) to extract and surgical replace strings in the frontmatter.

While this approach preserved minor whitespace and formatting details to minimize git diff noise, it has become increasingly brittle and complex, particularly as the system scales and edge cases arise (e.g., quotes, multi-line values, or trailing characters).

## Decision
We will standardize on using the `gray-matter` library for ALL programmatic read and write operations related to Foundry nodes.
- All custom regex manipulations for extracting or modifying frontmatter must be replaced.
- Modifications should be made by mutating the parsed `data` object and re-serializing the file using `matter.stringify(parsed.content, parsed.data)`.
- We accept the trade-off that `matter.stringify` may occasionally alter the exact serialization format (e.g., converting unquoted strings to quoted strings or reordering keys slightly) in exchange for robustness and predictability.

## Consequences
- The DAG orchestrator (`.github/scripts/foundry-orchestrator.ts`) and transition scripts (`.github/scripts/foundry-active.ts`) must be updated to use `matter.stringify`.
- The strict "dumb" diff checks in `foundry-active.ts` that compare the raw `content` lengths will need to be relaxed or removed, as `gray-matter` might serialize the identical data with slight formatting differences.
- Any future tooling or agents interacting with node files should use `gray-matter` instead of ad-hoc regex.
