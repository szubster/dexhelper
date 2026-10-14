import { type NodeFrontmatter } from './schema.ts';

/**
 * Parses node age from file frontmatter and filters nodes based on age and type.
 *
 * @param nodes - Array of parsed node frontmatter objects.
 * @param referenceDate - The current date to calculate age against.
 * @returns Array of transient nodes exceeding the 90-day threshold.
 */
export function filterArchivalNodes(nodes: NodeFrontmatter[], referenceDate: Date): NodeFrontmatter[] {
  const transientTypes = new Set(['TASK', 'STORY', 'EPIC', 'IDEA']);
  const thresholdMs = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds

  const filteredNodes = nodes.filter(node => {
    // Ensure high-value records are permanently retained
    if (!transientTypes.has(node.type)) {
      return false;
    }

    const updatedAt = new Date(node.updated_at);
    // Parse node age
    const ageMs = referenceDate.getTime() - updatedAt.getTime();

    // Identify nodes exceeding the 90-day threshold
    return ageMs > thresholdMs;
  });

  // Sort nodes to prioritize the oldest files first based on updated_at
  filteredNodes.sort((a, b) => {
    const timeA = new Date(a.updated_at).getTime();
    const timeB = new Date(b.updated_at).getTime();
    return timeA - timeB;
  });

  // Limit the deletion queue to a maximum of 50 nodes per execution cycle
  return filteredNodes.slice(0, 50);
}
