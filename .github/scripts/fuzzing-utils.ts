import fc from 'fast-check';

// Helper to generate a valid frontmatter node
export const validNodeFrontmatter = fc.record({
  id: fc.stringMatching(/^[a-z]+(?:-[0-9]{3}){1,2}-[a-z-]+$/),
  type: fc.constantFrom('IDEA', 'PRD', 'EPIC', 'STORY', 'TASK', 'RESEARCH', 'ADR', 'EXPERIMENT'),
  title: fc.string({ minLength: 1 }),
  status: fc.constantFrom('PENDING', 'READY', 'ACTIVE', 'VERIFYING', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'),
  owner_persona: fc.constantFrom('palette', 'product_manager', 'epic_planner', 'story_owner', 'architect', 'tech_lead', 'coder', 'qa', 'human', 'tpm', 'agile_coach', 'mechanic', 'researcher', 'auditor', 'canvas', 'changelogger'),
  created_at: fc.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
  updated_at: fc.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
  depends_on: fc.array(fc.string()),
  jules_session_id: fc.oneof(fc.constant(null), fc.string()),
  locks: fc.array(fc.string()),
  pr_number: fc.oneof(fc.constant(null), fc.integer()),
  parent: fc.oneof(fc.constant(null), fc.string()),
  tags: fc.array(fc.string()),
  research_references: fc.array(fc.string()),
  rejection_count: fc.integer({ min: 0 }),
  rejection_reason: fc.string(),
  notes: fc.string(),
});

export const generateDagNodesArbitrary = (options?: { minNodes?: number; maxNodes?: number }): fc.Arbitrary<any[]> => {
  const minLength = options?.minNodes ?? 1;
  const maxLength = options?.maxNodes ?? 10;

  return fc.uniqueArray(fc.stringMatching(/^[a-z]+(?:-[0-9]{3}){1,2}-[a-z-]+$/), { minLength, maxLength }).chain((ids) => {
    const nodeArbitraries = ids.map((id, index) => {
      const possibleDependencies = ids.slice(0, index);
      const dependsOnArbitrary = fc.subarray(possibleDependencies);

      return fc.record({
        id: fc.constant(id),
        type: fc.constantFrom('IDEA', 'PRD', 'EPIC', 'STORY', 'TASK', 'RESEARCH', 'ADR', 'EXPERIMENT'),
        title: fc.string({ minLength: 1 }),
        status: fc.constantFrom('PENDING', 'READY', 'ACTIVE', 'VERIFYING', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'),
        owner_persona: fc.constantFrom('palette', 'product_manager', 'epic_planner', 'story_owner', 'architect', 'tech_lead', 'coder', 'qa', 'human', 'tpm', 'agile_coach', 'mechanic', 'researcher', 'auditor', 'canvas', 'changelogger'),
        created_at: fc.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        updated_at: fc.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        depends_on: dependsOnArbitrary,
        jules_session_id: fc.oneof(fc.constant(null), fc.string()),
        locks: fc.array(fc.string()),
        pr_number: fc.oneof(fc.constant(null), fc.integer()),
        parent: fc.oneof(fc.constant(null), fc.string()),
        tags: fc.array(fc.string()),
        research_references: fc.array(fc.string()),
        rejection_count: fc.integer({ min: 0 }),
        rejection_reason: fc.string(),
        notes: fc.string(),
      });
    });

    if (nodeArbitraries.length === 0) return fc.constant([]);
    return fc.tuple(...nodeArbitraries);
  });
};

export interface DagConfig {
  maxDepth?: number;
  maxWidth?: number;
}

export const generateDependenciesArbitrary = (nodes: any[], config?: DagConfig): fc.Arbitrary<any[]> => {
  if (nodes.length === 0) return fc.constant([]);

  const depth = config?.maxDepth ?? nodes.length;
  const width = config?.maxWidth ?? nodes.length;

  return fc.array(fc.integer({ min: 0, max: depth - 1 }), { minLength: nodes.length, maxLength: nodes.length }).chain(layerAssignments => {
    let currentLayers = [...layerAssignments];
    const layerCounts = Array.from({ length: depth }).fill(0) as number[];

    for (let i = 0; i < currentLayers.length; i++) {
      let l = currentLayers[i];
      if (layerCounts[l] >= width) {
        let found = false;
        for (let j = 0; j < depth; j++) {
          if (layerCounts[j] < width) {
            currentLayers[i] = j;
            layerCounts[j]++;
            found = true;
            break;
          }
        }
        if (!found) {
          layerCounts[l]++;
        }
      } else {
        layerCounts[l]++;
      }
    }

    const nodesWithLayers = nodes.map((node, i) => ({ ...node, _layer: currentLayers[i] }));
    nodesWithLayers.sort((a, b) => a._layer - b._layer);

    const nodeArbs = nodesWithLayers.map((node, index) => {
      const allowedDependencies = nodesWithLayers.filter((n, j) => j < index && n._layer < node._layer).map(n => n.id);

      const dependsOnArbitrary = fc.subarray(allowedDependencies);
      return dependsOnArbitrary.map(deps => {
        const { _layer, ...rest } = node;
        return {
          ...rest,
          depends_on: deps
        };
      });
    });

    if (nodeArbs.length === 0) return fc.constant([]);
    return fc.tuple(...nodeArbs);
  });
};

export const fuzzingUtils = {
  validNodeFrontmatter,
  generateDagNodesArbitrary,
  generateDependenciesArbitrary,
  basicFuzzer: () => fc.assert(fc.property(fc.integer(), (n) => typeof n === 'number'))
};
