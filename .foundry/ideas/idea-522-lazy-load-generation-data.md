---
id: idea-522-lazy-load-generation-data
type: IDEA
title: Lazy Load Generation-Specific Data and UI
status: READY
owner_persona: product_manager
---

# Idea: Lazy Load Generation-Specific Data and UI

## Context
Currently, DexHelper loads all Pokemon data (via `pokedata.msgpack`) and generation-specific React components for all generations upfront during the initial load. As we plan to add support for more generations (like Gen 4 and beyond), this approach will result in significant bundle size bloat, longer initial load times, and higher memory consumption, directly impacting performance on lower-end devices. Profiling metrics suggest that the current monolithic payload is becoming a bottleneck.

## Proposal
Implement a dynamic loading strategy based on the uploaded save file's generation. We propose splitting the large monolithic `pokedata.msgpack` into generation-specific chunks (e.g., `gen1-data.msgpack`, `gen2-data.msgpack`, etc.). The client application will first parse the save file to determine the generation, and only then dynamically import the necessary data chunk and the corresponding React components/dashboard modules (e.g., using `React.lazy` and dynamic imports for routing).

## Value Proposition
- **Reduced Initial Payload:** Decreases the initial JavaScript and data payload size significantly, leading to faster Time to Interactive (TTI).
- **Lower Memory Footprint:** The application will only hold data and components for the active generation in memory, reducing Garbage Collection pauses and improving overall responsiveness.
- **Scalability:** Future generations can be added without linearly increasing the base load time for all users.

## Next Steps
- [ ] prd-522-565-lazy-load-generation-data
