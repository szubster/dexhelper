## Action Taken
Replaced an insecure `Math.random()` call in `src/components/RetroBackground.tsx` with `window.crypto.getRandomValues()`.

## Learnings & Patterns
**Pattern:** Even if pseudo-random generation is only used for UI/visual effects (like scrolling hex data streams), SAST tools will routinely flag `Math.random()` as a high-severity CWE-338 (Use of Cryptographically Weak PRNG) violation.
**Policy Update:** Always default to `window.crypto.getRandomValues` in the browser or `node:crypto` in Node environments, regardless of the security context of the generated value, to maintain zero-warning compliance.

# Shield Security Journal - brace-expansion Vulnerability

**Vulnerability:**
A high-severity DoS vulnerability via unbounded expansion length (GHSA-mh99-v99m-4gvg) was discovered in `brace-expansion < 2.1.3`.

**Action Taken:**
Added a pnpm override in `pnpm-workspace.yaml` for `brace-expansion@<2.1.3` to resolve to `^2.1.3`.

**Key Learnings:**
- In a pnpm workspaces setup, dependency overrides must be configured using the `overrides:` block within `pnpm-workspace.yaml`. The `pnpm.overrides` field in `package.json` is deprecated and ignored by newer versions of pnpm.
- When applying overrides, ensure the resolution string is a valid semver range and preserves major version bounds (e.g. `^2.1.3` instead of `>=2.1.3`) to prevent pulling in breaking changes (like ESM-only updates) that could cause runtime crashes in dependencies.


### Session: YYYY-MM-DD-HH-MM-SS.md
Resolved high/moderate dependency vulnerabilities in undici and fast-uri by injecting pnpm overrides into pnpm-workspace.yaml using `pnpm audit --fix override`. Tests passing.


### Session: 2024-05-24-12-00-00.md
# Vulnerable dependency upgrade

During this session, I ran `pnpm audit` and found a vulnerable dependency (`js-yaml`). I created a `.pnpmfile.cjs` hook initially but later opted for `pnpm`'s built-in overrides in `pnpm-workspace.yaml` instead, which cleanly upgraded `js-yaml` from `3.15.0` to `3.15.1`. All tests and audits pass successfully now.
