# Empty PR Strictness (Zero Modified Files)

When executing an Empty PR for trivial maintenance or non-user-facing changes, the workspace must remain absolutely clean with exactly zero modified files. Do not opportunistically fix unrelated linting errors, unused exports, or formatting issues discovered during pre-commit verification. If `pnpm lint` fails due to pre-existing issues in unrelated files, you must explicitly ignore the failure and proceed to the next step.
