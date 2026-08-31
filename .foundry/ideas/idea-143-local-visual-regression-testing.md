---
id: idea-143-local-visual-regression-testing
type: IDEA
title: Local Visual Regression Testing & Component Diffing
status: ACTIVE
owner_persona: canvas
created_at: '2026-08-09'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: '2863942919019181420'
pr_number: null
parent: null
tags:
  - testing
  - frontend
  - visual-regression
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Local Visual Regression Testing & Component Diffing

## Problem
Currently, visual differences in components (especially complex interactive interfaces like the interactive node canvas, visualizers, and dashboard layouts) are difficult to track, review, and assert locally. The project team previously integrated Argos CI, but rapidly exhausted the free-tier limits, and there is no budget or desire to pay for commercial SaaS visual regression services. Developers need a free, self-hosted, deterministic way to verify visual rendering locally and within CI without depending on third-party SaaS platforms.

## Proposed Solution
Leverage our existing Playwright testing ecosystem, which runs locally and in GitHub Actions CI, to perform self-contained visual regression testing and component snapshot diffing:
1. Define a local/CI-based visual testing workflow using Playwright's built-in `expect(page).toHaveScreenshot()` or standard diffing library utilities (e.g. `pixelmatch`).
2. Add specific, automated screenshot tests focusing on critical user interfaces, especially the interactive DAG visualization Canvas and the core application dashboards.
3. Configure visual regression assertions with configurable tolerance rules (e.g. `maxDiffPixelRatio` or CSS-isolated animations) to prevent false positives across different execution environments.
4. Export visual comparison reports (such as Playwright's standard HTML report containing before/after diff overlays) as GitHub Actions build artifacts when failures occur. This provides rich visual diagnostics at absolutely zero cost.

## Value Proposition
- **Cost Efficiency**: Eliminates dependencies on paid SaaS platforms like Argos CI, achieving 100% free visual regression coverage.
- **Developer Velocity**: Enables local screenshot validation on the developer's machine before submitting pull requests, reducing CI loops.
- **Robustness**: Ensures the interactive canvas rendering and critical dashboards remain pixel-perfect and regression-free.

## Acceptance Criteria
- [ ] Canvas: Draft a PRD defining the local visual regression setup, screenshot strategies for the canvas, and artifact upload workflows for CI.
