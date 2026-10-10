import { WIP_DRAFT_BANNER, removeWipBanner } from './banner.ts';

export function replaceFrontmatterStatus(content: string, targetStatus: string): string {
  const frontmatterBlockRegex = /^(---[\s\S]*?^---)/m;
  let newContent = content.replace(frontmatterBlockRegex, (match) => {
    const statusRegex = /^status:\s*.*$/m;
    return match.replace(statusRegex, `status: ${targetStatus}`);
  });

  if (targetStatus === 'WIP' || targetStatus === 'DRAFT') {
    newContent = removeWipBanner(newContent);
    newContent = newContent.replace(frontmatterBlockRegex, (match) => {
      return `${match}\n\n${WIP_DRAFT_BANNER}`;
    });
    newContent = newContent.replace(/---\n\n\n+/g, '---\n\n');
  } else {
    newContent = removeWipBanner(newContent);
  }

  return newContent;
}