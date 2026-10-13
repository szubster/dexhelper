import matter from '@11ty/gray-matter';

export interface FoundryNodeData {
  id: string;
  type: string;
  status: string;
  owner_persona: string;
  depends_on: string[];
  rejection_count: number;
  experiment_variants?: string[] | undefined;
  confidence_score?: number | null;
}

export function parseFoundryNode(rawContent: string): FoundryNodeData | null {
  try {
    const parsed = matter(rawContent);
    const data = parsed.data;

    // Validate required fields
    if (
      typeof data['id'] !== 'string' ||
      typeof data['type'] !== 'string' ||
      typeof data['status'] !== 'string' ||
      typeof data['owner_persona'] !== 'string' ||
      !Array.isArray(data['depends_on'])
    ) {
      return null;
    }

    const parsedRejectionCount = data['rejection_count'];
    const rejection_count = typeof parsedRejectionCount === 'number' ? parsedRejectionCount : 0;

    const result: FoundryNodeData = {
      id: data['id'],
      type: data['type'],
      status: data['status'],
      owner_persona: data['owner_persona'],
      depends_on: data['depends_on'],
      rejection_count,
    };

    if (Array.isArray(data['experiment_variants'])) {
      result.experiment_variants = data['experiment_variants'];
    }

    if (typeof data['confidence_score'] === 'number') {
      result.confidence_score = data['confidence_score'];
    } else if (data['confidence_score'] === null) {
      result.confidence_score = null;
    }

    return result;
  } catch {
    // If gray-matter fails to parse, return null
    return null;
  }
}
