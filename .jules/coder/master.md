# Virtualized Grid Testing Learnings

When testing components that rely on `@tanstack/react-virtual`'s `useWindowVirtualizer` but are rendered inside a specific fixed-height scroll container (like a `.custom-scrollbar` modal or sidebar) rather than the global `window`, simply scrolling the element is not enough to trigger the virtualization updates in E2E tests.

Because `useWindowVirtualizer` listens specifically to `window`'s scroll and resize events, E2E tests must:
1. First, scroll the actual DOM element (e.g. `node.scrollTo(0, node.scrollHeight)`).
2. Second, dispatch a simulated `scroll` event directly on the `window` object to trigger the React hook's listener.
3. If necessary, spoof `window.scrollY` prior to dispatching the event.

Without spoofing the window event, the virtualizer assumes no scrolling has occurred and will fail to render the lazy-loaded DOM elements, causing `toBeVisible` assertions to time out.

---

# Component Integration Check and BundleMon Limit Policy

When implementing new React components in `src/features/*`, always ensure they are actually integrated into the view hierarchy (e.g. replacing a placeholder component on the application dashboard) to pass the code reviewer's `Component Integration Policy` check.

When stylistic or component updates increase the size of the global stylesheet (`assets/index-<hash>.css`) slightly above the BundleMon limit in CI, adjust the `maxSize` threshold in `.bundlemonrc.json` upward marginally (e.g. from 225kb to 230kb) and verify the fix locally with `pnpm build && pnpm test:bundle`.

---

# Playwright Locator Specificity (Tailwind CSS and Nested Structures)

When testing for classes on nested elements with common utility classes (like `border-dashed`) in Playwright E2E tests, using broad locators like `page.locator('div.border-dashed').filter({ hasText: '...' }).first()` can be unreliable and may resolve to an unintended ancestor wrapper (like the entire column or section) instead of the actual target card, leading to assertion failures (e.g. `toHaveClass(/border-red-600/)` failing).

Instead, target the unique content (e.g., node ID) with `getByText(...)` and traverse up to the specific closest container using XPath:
```typescript
page.getByText('task-perm-fail').locator('xpath=ancestor::div[contains(@class, "border-dashed")][1]')
```

---

# Shiny Breeding UI (Gen 2)

**Task**: Implementation of manual breeding selection UI for Gen 2 Pokémon.
**Component**: `ShinyBreedingManualSelector.tsx`

- Learned that when dealing with `vitest-browser-react`, `render(<Component />)` returns a Promise that MUST be `await`ed, as noted in the project memory guidelines.
- Created `TacticalSelect` dropdowns rendering choices from both Party and PC, mapping `getDerivedParentStats` correctly to display derived properties like Gender (using Attack DV threshold calculation via `calculateGen2Gender`), Defense DV, and Special DV.
- Successfully verified E2E and component-level execution. Tests validate the behavior, including correct shiny calculation when two optimal shiny-carrying parents are selected manually.