In this session, we analyzed the team's need for a cost-effective, local, and reliable visual regression testing solution to track visual differences in UI components (especially the interactive node canvas) after exhausting Argos CI's free tier.

To address this, we created a new PENDING IDEA node (`idea-143-local-visual-regression-testing.md`) to establish a free, self-hosted, and Playwright-backed visual testing framework.

## Key Decisions & Insights
- **Leverage Existing Infrastructure**: Instead of adopting a new SaaS platform or complex infrastructure, we can use Playwright's built-in snapshot assertions (`expect(page).toHaveScreenshot()`) and HTML reports.
- **Self-Host & Local First**: Shifting the source of truth for snapshots to the repository and comparing them locally/CI-side via Playwright HTML reports avoids commercial API limits completely.
- **Canvas Focus**: Interactive canvas components are particularly prone to visual glitches during layout changes. Local visual snapshots will act as an essential safety net.

## Next Steps
- Spawn a PRD to detail the implementation plan, directory structures for baseline screenshots, and pixel-matching configuration limits.
