import * as yaml from 'js-yaml';

export interface FoundryNodeData {
  id: string;
  type: string;
  status: string;
  owner_persona: string;
  depends_on: string[];
  rejection_count: number;
}

export function parseFoundryNode(rawContent: string): FoundryNodeData | null {
  try {
    // Extract frontmatter using regex
    const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match || match.length < 2 || typeof match[1] !== 'string') return null;

    const data = yaml.load(match[1]) as Record<string, unknown>;

    if (!data || typeof data !== 'object') return null;

    // Validate required fields
    if (
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      typeof data['id'] !== 'string' ||
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      typeof data['type'] !== 'string' ||
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      typeof data['status'] !== 'string' ||
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      typeof data['owner_persona'] !== 'string' ||
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      !Array.isArray(data['depends_on'])
    ) {
      return null;
    }

    // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
    const parsedRejectionCount = data['rejection_count'];
    const rejection_count = typeof parsedRejectionCount === 'number' ? parsedRejectionCount : 0;

    return {
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      id: data['id'],
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      type: data['type'],
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      status: data['status'],
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      owner_persona: data['owner_persona'],
      // biome-ignore lint/complexity/useLiteralKeys: TSConfig strictly requires bracket notation
      depends_on: data['depends_on'],
      rejection_count,
    };
  } catch {
    // If gray-matter fails to parse, return null
    return null;
  }
}
