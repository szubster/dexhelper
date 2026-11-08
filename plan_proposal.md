1. Add `<DagFilterPanel />` back to `src/components/dag/DagWrapper.tsx` inside the `DagViewSwitcher` function.
2. The UI rendering issue indicates that the `DagFilterPanel` isn't being rendered on the heatmap E2E test, which expects to see `Toggle heatmap overlay`. The element isn't in the DOM at all.
3. According to `pre_commit_instructions`, rendering it unconditionally in tree view causes pointer events issues on `DagTree` action buttons, so it must only be rendered conditionally when `activeView === 'board'`.

Let's modify `src/components/dag/DagWrapper.tsx`.
