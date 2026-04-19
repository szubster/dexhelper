## 2025-04-19 - [Accepted] - New agent: Sweeper (Code Health & Tech Debt)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (code health PR prefix). Note: The user explicitly wants to keep both `bundlemon` and Codecov Vite plugin in the project. They are used intentionally in parallel, so agents should never remove `bundlemon` as an "unused" dependency.

## 2026-04-19 - [Pending] - New agent: Shield (Security & Cryptography)
**Type:** New agent
**Outcome:** Pending
**Why:** Proposal submitted to maintainer to address security vulnerabilities and cryptographic concerns.
**Pattern:** Proposing based on hints in memory (CWE-209 prevention, native `node:crypto` usage, and security fix PR title format).
