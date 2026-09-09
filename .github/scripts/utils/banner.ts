export function removeWipBanner(content: string): string {
  // Matches "> ⚠️ **WORK IN PROGRESS / DRAFT**" with optional whitespace/newlines
  const regex = /^\s*>\s*⚠️\s*\*\*WORK IN PROGRESS \/ DRAFT\*\*\s*[\r\n]*/m;
  return content.replace(regex, '');
}
