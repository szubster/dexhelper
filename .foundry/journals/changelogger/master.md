<!-- Merged from 2026-09-09-06-30-00.md -->

---

# Empty PR Strictness

When executing an Empty PR for trivial maintenance or non-user-facing changes, the workspace must remain absolutely clean with exactly zero modified files. Do not opportunistically fix unrelated linting errors, unused exports, or formatting issues discovered during pre-commit verification (like updating knip.json to fix unused exports), as this violates the Empty PR contract and triggers immediate code review rejection.
