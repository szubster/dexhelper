## 2025-06-26 - [Rejected] - 🖼️ Canvas: Tactical SideNav Redesign
**What:** Extracted the desktop navigation links from the `AppHeader` into a dedicated, vertically-oriented `SideNav` component. Reconfigured `AppLayout` to display this sidebar alongside the main content area on larger screens (`sm:flex`).
**Outcome:** Rejected → journaled
**Why:** The maintainer preferred the previous look with the navigation items integrated into the top header.
**Pattern:** While vertical sidebars are common for dashboards, avoid moving core navigation out of the top header for desktop layouts, as it changes the structural feel too drastically for the maintainer's preference. Keep navigation integrated into `AppLayout`/`AppHeader` or `BottomNav`.
