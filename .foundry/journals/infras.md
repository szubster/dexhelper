## 2026-05-13 - BundleMon Threshold Adjustment

**Learning:** Raised BundleMon limits for JS and CSS bundles. The addition of React Flow for the DAG dashboard increased the bundle size beyond the previous limits (JS was 650KB -> 754KB, CSS was 100KB -> 104KB). The limits were updated to 850KB for JS and 120KB for CSS in `.bundlemonrc.json`.
