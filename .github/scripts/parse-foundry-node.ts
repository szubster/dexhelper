export interface ParsedFoundryNode {
  frontmatter: Record<string, unknown>;
  body: string;
}

export type ParseFoundryNodeFn = (fileContent: string) => ParsedFoundryNode;
