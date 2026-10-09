# Virtualized Grid Testing Learnings

When testing components that rely on `@tanstack/react-virtual`'s `useWindowVirtualizer` but are rendered inside a specific fixed-height scroll container (like a `.custom-scrollbar` modal or sidebar) rather than the global `window`, simply scrolling the element is not enough to trigger the virtualization updates in E2E tests.

Because `useWindowVirtualizer` listens specifically to `window`'s scroll and resize events, E2E tests must:
1. First, scroll the actual DOM element (e.g. `node.scrollTo(0, node.scrollHeight)`).
2. Second, dispatch a simulated `scroll` event directly on the `window` object to trigger the React hook's listener.
3. If necessary, spoof `window.scrollY` prior to dispatching the event.

Without spoofing the window event, the virtualizer assumes no scrolling has occurred and will fail to render the lazy-loaded DOM elements, causing `toBeVisible` assertions to time out.