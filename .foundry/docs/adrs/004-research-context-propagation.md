# ADR 004: Research Context Propagation

## Status
Accepted

## Context
The Foundry currently requires downstream engineering agents to execute specific coding tasks. However, these agents often lack sufficient deep domain context (such as architectural decisions, third-party API quirks, or algorithmic research) necessary to perform their tasks correctly. Directly adding this research into a single TASK node balloons the task length and makes it unreadable. We need a systematic way to inject researched knowledge into any task.

## Decision
We will introduce a `researcher` persona responsible for exploratory tasks and documenting findings. These findings will be stored as markdown files in `.foundry/research/`.

To inject this context, we will add a `research_references` optional string array to the global YAML frontmatter schema. Any node in the Foundry DAG can define a list of repo-relative paths pointing to these research files.

The Foundry Engine orchestrator (`.github/workflows/foundry-engine.yml`) will automatically crawl the dependency chain (via the `parent` linkage) of any executing node. It will read the `research_references` at each level, extract the referenced markdown files, and inject the file paths as references within the agent's context. The agent will be responsible for using the `read_file` tool to read the contents if it deems the research necessary, preventing massive context bloat.

### Security Constraint
When the Foundry Engine extracts `research_references` during CI dispatch, it must do so securely. If parsing is done via an inline Node.js script, it **must avoid command injection**. Specifically, the script must not interpolate bash variables containing filenames directly into the JS string. It must pass paths via environment variables (e.g., `process.env.TARGET_FILE`) and use a safe parser like `gray-matter`.

## Consequences
- Agents will receive concatenated, relevant research context without the CEO or PM needing to manually duplicate context across task files.
- The prompt sizes for Jules sessions will increase, consuming more token context.
- We must enforce strict file extension checks (e.g. `.md`) to avoid parsing binary files during injection.
