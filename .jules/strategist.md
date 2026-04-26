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
## 2025-04-22 - [Rejected] - Prompt improvement - Ensure Strategist properly discovers and logs unrecorded past outcomes
**Type:** Prompt improvement
**Outcome:** Rejected → journaled
**Why:** The maintainer rejected the proposal to use `git log` to retroactively discover outcomes, stating explicitly: "They should not look at past commits to figure out their memory, as journal always has them. Every PR either has code changes + journal (optionally, if useful), or journal only with rejection statement and reason for future learning."
**Pattern:** Do not propose tracking memory through past commits instead of the explicit journal mechanism defined in the "Wait and Convert" flow.

## 2025-04-23 - [Accepted] - Prompt improvement - Remove Git/PR history as memory source
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Maintainer clarified that agents should not look at past commits to figure out their memory, as the journal always has them.
**Pattern:** Do not instruct agents to read PR history for cross-session memory.

## 2026-05-15 - [Accepted] - Prompt improvement - Update PR titles and bodies to match system memory
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** The PR formatting rules in the agent prompts needed to match the explicit rules in the system memory.
**Pattern:** Proposing changes to correctly format agent output based on the project's requirements.

## 2026-05-25 - [Accepted] - Prompt improvement - Integrate Knip guardrails into Sweeper
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Sweeper agent's journal indicated `knip` was very effective but risky regarding implicitly required files/dependencies.
**Pattern:** Updating agent schedules to codify important lessons from their journals to avoid repeated mistakes.
