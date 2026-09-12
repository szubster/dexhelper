export function replaceFrontmatterStatus(content: string, targetStatus: string): string {
  // Matches "status: <anything>" inside the frontmatter (between first two ---)
  // But simpler, just replace the first occurrence of ^status: .*$ with ^status: targetStatus
  const statusRegex = /^status:\s*.*$/m;
  return content.replace(statusRegex, `status: ${targetStatus}`);
}
