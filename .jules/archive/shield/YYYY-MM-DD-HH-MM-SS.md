# Cryptographic Secure Pseudo-Random Number Generation

During this session, I replaced `Math.random()` with `globalThis.crypto.getRandomValues()` in `src/components/SearchAndFilters.tsx` to generate a random hex string for visual effect.
I also learned that `window.crypto.getRandomValues()` should be used when purely client-side rendering, but if the component is used in Server-Side Rendering (SSR) environments, `globalThis.crypto.getRandomValues` is a safer cross-environment alternative as `window` might be undefined on the server.
I fixed the CodeQL warning by using a bitwise AND mask instead of the modulo operator.
I also fixed the typescript error by using `(randomValues[i] || 0)` instead of `randomValues[i]!`.
