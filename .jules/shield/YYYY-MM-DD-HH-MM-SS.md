# Cryptographic Secure Pseudo-Random Number Generation

During this session, I replaced `Math.random()` with `window.crypto.getRandomValues()` in `src/components/SearchAndFilters.tsx` to generate a random hex string for visual effect.
I also learned that `window.crypto.getRandomValues()` should be used when purely client-side rendering, but if the component is used in Server-Side Rendering (SSR) environments, `globalThis.crypto.getRandomValues` is a safer cross-environment alternative as `window` might be undefined on the server.
