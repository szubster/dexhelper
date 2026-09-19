export function replaceFrontmatterStatus(content: string, targetStatus: string): string {
  // Replace "status: <anything>" only inside the frontmatter block (between first two ---)
  const frontmatterBlockRegex = /^(---[\s\S]*?^---)/m;
  return content.replace(frontmatterBlockRegex, (match) => {
    const statusRegex = /^status:\s*.*$/m;
    return match.replace(statusRegex, `status: ${targetStatus}`);
  });
}
