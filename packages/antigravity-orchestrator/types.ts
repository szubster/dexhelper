export type ModelTier = 'flash' | 'pro' | 'flash_lite';

export interface NodeData {
  id: string;
  type: string;
  title: string;
  status: string;
  owner_persona: string;
  jules_session_id?: string | null | undefined;
  pr_number?: number | null | undefined;
  rejection_count?: number | undefined;
  rejection_reason?: string | undefined;
  filePath: string;
  repoPath: string;
  rawContent: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

export interface PRInfo {
  number: number;
  title: string;
  headRefName?: string | undefined;
  state: 'OPEN' | 'CLOSED' | 'MERGED';
  url?: string | undefined;
  mergedAt?: string | null | undefined;
  isMerged?: boolean | undefined;
  body?: string | undefined;
}

export interface GitOptions {
  repoRoot?: string | undefined;
  dryRun?: boolean | undefined;
  push?: boolean | undefined;
  remote?: string | undefined;
  branch?: string | undefined;
  log?: ((msg: string) => void) | undefined;
}

export interface GitResult {
  committed: boolean;
  pushed: boolean;
  error?: string | undefined;
}

export interface DispatchOptions {
  nodeId?: string | undefined;
  model?: ModelTier | undefined;
  git?: boolean | undefined;
  push?: boolean | undefined;
  dryRun?: boolean | undefined;
  agentapiBin?: string | undefined;
  repoRoot?: string | undefined;
  log?: ((msg: string) => void) | undefined;
}

export interface DispatchResult {
  nodeId: string;
  repoPath: string;
  sessionId: string;
  modelUsed: ModelTier;
  attempts: { model: ModelTier; error?: string | undefined }[];
  success: boolean;
  error?: string | undefined;
  gitStatus?: GitResult | undefined;
}

export interface ReconcileOptions {
  git?: boolean | undefined;
  push?: boolean | undefined;
  dryRun?: boolean | undefined;
  repoRoot?: string | undefined;
  repoFullName?: string | undefined;
  githubToken?: string | undefined;
  log?: ((msg: string) => void) | undefined;
}

export interface ReconcileResult {
  nodeId: string;
  repoPath: string;
  sessionId: string;
  prNumber?: number | undefined;
  previousStatus: string;
  newStatus: string;
  reason?: string | undefined;
}

export interface AssignOptions {
  nodeId?: string | undefined;
  persona?: string | undefined;
  git?: boolean | undefined;
  push?: boolean | undefined;
  dryRun?: boolean | undefined;
  repoRoot?: string | undefined;
  log?: ((msg: string) => void) | undefined;
}

export interface AssignResult {
  nodeId: string;
  repoPath: string;
  sessionId: string;
  persona: string;
  success: boolean;
  error?: string | undefined;
  gitStatus?: GitResult | undefined;
}

export interface StatusReport {
  readyNodes: {
    id: string;
    repoPath: string;
    title: string;
    persona: string;
    recommendedModel: ModelTier;
  }[];
  activeAntigravityNodes: {
    id: string;
    repoPath: string;
    title: string;
    persona: string;
    sessionId: string;
    prNumber?: number | undefined;
    prState?: string | undefined;
  }[];
  activeJulesNodes: {
    id: string;
    repoPath: string;
    title: string;
    persona: string;
    sessionId: string;
  }[];
  markdownTable: string;
}
