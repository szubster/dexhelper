# 2026-10-01: Agent Confidence Score Integration

Today, I updated the core agent policies and prompt files (`coder.md`, `qa.md`, and `core_policies.md`) to instruct agents to explicitly include a `confidence_score` (0-100) in the YAML frontmatter of the node files they complete or work on.

This requires a change to the core YAML modification policy, as previously agents were forbidden from editing frontmatter except to mark FAILED or CANCELLED statuses. The policy has been amended to explicitly allow frontmatter modifications when updating the `confidence_score`.

This pattern should be observed when implementing similar metadata metrics in the future: any metadata that needs to be self-reported during execution must explicitly be granted an exception in the `core_policies.md` frontmatter mutability rules.
