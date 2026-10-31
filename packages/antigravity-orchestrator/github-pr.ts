import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { NodeData, PRInfo } from './types.ts';
import type { CommandExecutor } from './agentapi.ts';

const execFileAsync = promisify(execFile);

export const defaultPrExecutor: CommandExecutor = async (file, args) => {
  return await execFileAsync(file, args, { maxBuffer: 10 * 1024 * 1024 });
};

export interface FetchPROptions {
  repoFullName?: string | undefined;
  githubToken?: string | undefined;
  executor?: CommandExecutor | undefined;
  log?: ((msg: string) => void) | undefined;
}

/**
 * Fetches recent pull requests using `gh pr list` or GitHub REST API.
 */
export async function fetchRecentPRs(options: FetchPROptions = {}): Promise<PRInfo[]> {
  const log = options.log || ((msg: string) => process.stderr.write(`${msg}\n`));
  const executor = options.executor || defaultPrExecutor;

  // 1. Try gh CLI
  try {
    const { stdout } = await executor('gh', [
      'pr',
      'list',
      '--state',
      'all',
      '--limit',
      '100',
      '--json',
      'number,title,headRefName,state,url,mergedAt,body',
    ]);

    const parsed = JSON.parse(stdout.trim()) as any[];
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        number: item.number,
        title: item.title,
        headRefName: item.headRefName,
        state: item.state === 'MERGED' ? 'MERGED' : item.state === 'CLOSED' ? 'CLOSED' : 'OPEN',
        url: item.url,
        mergedAt: item.mergedAt || null,
        isMerged: item.state === 'MERGED' || !!item.mergedAt,
        body: item.body || '',
      }));
    }
  } catch (err) {
    log(`[antigravity] gh CLI fetch failed: ${String(err)}. Attempting GitHub API fallback...`);
  }

  // 2. Try GitHub REST API
  const token = options.githubToken || process.env['GITHUB_TOKEN'] || process.env['GH_TOKEN'];
  const repo = options.repoFullName || process.env['GITHUB_REPOSITORY'] || 'szubster/dexhelper';

  if (token) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/pulls?state=all&per_page=100`, {
        headers: {
          'User-Agent': 'dexhelper-orchestrator',
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (res.ok) {
        const data = (await res.json()) as any[];
        if (Array.isArray(data)) {
          return data.map((item) => {
            const isMerged = item.merged_at !== null && item.merged_at !== undefined;
            const state: 'OPEN' | 'CLOSED' | 'MERGED' = isMerged
              ? 'MERGED'
              : item.state === 'closed'
                ? 'CLOSED'
                : 'OPEN';
            return {
              number: item.number,
              title: item.title,
              headRefName: item.head?.ref,
              state,
              url: item.html_url || item.url,
              mergedAt: item.merged_at || null,
              isMerged,
              body: item.body || '',
            };
          });
        }
      }
    } catch (apiErr) {
      log(`[antigravity] GitHub API fetch failed: ${String(apiErr)}`);
    }
  }

  return [];
}

/**
 * Matches a GitHub PR to a Foundry node based on pr_number, branch name, title prefix, or body reference.
 */
export function matchPRToNode(node: NodeData, prs: PRInfo[]): PRInfo | null {
  // 1. Direct match on existing pr_number if already linked
  if (node.pr_number) {
    const directMatch = prs.find((pr) => pr.number === node.pr_number);
    if (directMatch) return directMatch;
  }

  const targetBranch = `antigravity/${node.id}`.toLowerCase();
  const titleMarker = `[${node.id}]`.toLowerCase();
  const nodeIdLower = node.id.toLowerCase();

  // 2. Direct match on branch name
  const branchMatch = prs.find((pr) => pr.headRefName?.toLowerCase() === targetBranch);
  if (branchMatch) return branchMatch;

  // 3. Exact bracketed title match: "[<node-id>]"
  const titleMatch = prs.find((pr) => pr.title.toLowerCase().includes(titleMarker));
  if (titleMatch) return titleMatch;

  // 4. Prefix title match: "<node-id>:" or "<node-id> "
  const prefixMatch = prs.find((pr) => {
    const t = pr.title.toLowerCase();
    return t.startsWith(`${nodeIdLower}:`) || t.startsWith(`${nodeIdLower} `);
  });
  if (prefixMatch) return prefixMatch;

  // 5. Branch containing node-id
  const fuzzyBranch = prs.find(
    (pr) => pr.headRefName && pr.headRefName.toLowerCase().includes(nodeIdLower)
  );
  if (fuzzyBranch) return fuzzyBranch;

  // 6. Body match with session ID or node ID
  if (node.jules_session_id) {
    const sessionMatch = prs.find((pr) => pr.body && pr.body.includes(node.jules_session_id!));
    if (sessionMatch) return sessionMatch;
  }

  const bodyMatch = prs.find(
    (pr) => pr.body && pr.body.toLowerCase().includes(nodeIdLower)
  );
  if (bodyMatch) return bodyMatch;

  return null;
}
