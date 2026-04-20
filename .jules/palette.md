# Palette UX/A11y Learnings

- **Interactive Elements Focus Styles:** All interactive elements (e.g., links, buttons, custom file upload labels) must explicitly define focus styles using the standard utility class string: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950`. This ensures consistent keyboard navigation visibility across the app.
