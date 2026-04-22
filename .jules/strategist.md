## 2025-04-19 - [Accepted] - New agent: Sweeper (Code Health & Tech Debt)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (code health PR prefix). Note: The user explicitly wants to keep both `bundlemon` and Codecov Vite plugin in the project. They are used intentionally in parallel, so agents should never remove `bundlemon` as an "unused" dependency.

## 2026-04-19 - [Accepted] - New agent: Shield (Security & Cryptography)
**Type:** New agent
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer instructed to add the agent directly.
**Pattern:** Proposing based on hints in memory (CWE-209 prevention, native `node:crypto` usage, and security fix PR title format).

## 2026-04-20 - [Accepted] - prompt improvement - Add visual regression testing to Sentinel
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Proposal submitted to maintainer and maintainer merged the changes.
**Pattern:** Proposing an improvement based on specific missing test strategies found in the ecosystem.
## 2025-04-22 - [Accepted] - Prompt improvement - Ensure Strategist properly discovers and logs unrecorded past outcomes
**Type:** Prompt improvement
**Outcome:** Accepted
**Why:** Proposal aligns instructions with system guidelines specifying to "discover past outcomes via `git log` instead of preemptively logging current proposals".
**Pattern:** Following the system guideline: "When searching for unrecorded PR outcomes via `git log`, note that a PR's commit hash might not exist in `main` if it was squashed or fast-forwarded. Verify integration by checking if the code changes actually exist in the `main` branch's files".
