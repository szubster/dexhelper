## Critical Learnings
- **GitHub Annotations DX:** The GitHub Actions pipeline runs multiple linters (Biome, Oxlint, Knip) without configuring their reporters, making PR review DX suboptimal since logs must be read manually.
- Configured each linter in `.github/workflows/ci.yml` to output in Github Annotations format (e.g. `--reporter=github` for Biome, `-f github` for Oxlint, `--reporter github-actions` for Knip). This directly flags the relevant lines of code in a PR's 'Files Changed' tab.
